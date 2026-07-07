
import { Stripe } from "stripe";
import config from "../../config";
import { AppError } from "../../global/apperror";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import httpStatus from "http-status";

const createPaymentIntoDB = async (userId: string, rentalId: string) => {

    const transactionResult = await prisma.$transaction(async (tx) => {

        const rental = await tx.rental.findFirst({
            where: {
                id: rentalId,
                user_id: userId
            },
            include: {
                gear: true,
                payment: true,
            },
        });

        if (!rental || rental.user_id !== userId) {
            throw new AppError(httpStatus.NOT_FOUND, "Rental not found with your user id.");
        }
        // Check existing payment
        if (rental.payment) {
            if (rental.payment.status === "SUCCESS") {
                throw new AppError(httpStatus.BAD_REQUEST,"Payment already completed for this rental."
                );
            }
            if (rental.payment.status === "PENDING") {
                await tx.payment.delete({
                    where: {
                        id: rental.payment.id,
                    },
                });
            }
        }
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "bdt",
                        product_data: {
                            name: rental.gear.name,
                            description: rental.gear.description ?? "",
                        },
                        unit_amount: Math.round(rental.total_price * 100),
                    },
                    quantity: 1,
                },
            ],
            success_url: `${config.client_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${config.cancel_url}/payment/cancel`,
            metadata: {
                rentalId: rental.id,
                userId: rental.user_id,
            }
        })

        await tx.payment.create({
            data: {
                customerId: userId,
                rental_id: rental.id,
                transaction_id: session.id,
                amount: rental.total_price,
                provider: "STRIPE",
                paid_at: null,
                status: "PENDING",
            }
        })

        return session.url;

    });

    return transactionResult;

}
const confirmPaymentIntoDB = async (payload: Buffer, signature: string) => {

    const endpointSecret = config.stripe_webhook_secret;

    const event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);

    if (event.type !== "checkout.session.completed") {
        return;
    }
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status !== "paid") {
        return;
    }
    const rentalId = session.metadata?.rentalId;
    if (!rentalId) {
        throw new AppError(httpStatus.BAD_REQUEST, "Rental id missing from metadata.");
    }
    const payment = await prisma.payment.findUnique({
        where: {
            transaction_id: session.id,
        }
    })
    if (!payment) {
        throw new AppError(httpStatus.NOT_FOUND, "Payment not found.");
    }
    if (payment.status === "SUCCESS") {
        throw new AppError(httpStatus.BAD_REQUEST, "Payment already confirmed.");
    }
    await prisma.$transaction(async (tx) => {
        await tx.payment.update({
            where: {
                transaction_id: session.id,
            },
            data: {
                status: "SUCCESS",
                paid_at: new Date(),
            },
        });
        await tx.rental.update({
            where: {
                id: rentalId,
            },
            data: {
                status: "PAID",
            },
        });
    });
}
const getAllPaymentFromDB = async (userId: string) => {
    const payments = await prisma.payment.findMany({
        where: {
            customerId: userId,
        },
        include: {
            rental: {
                include: {
                    gear: true,
                },
            },
        },
    });
    if (payments.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, "No payments found");
    }
    return payments;
}

const getPaymentByIdFromDB = async (userId: string, paymentId: string) => {
    const payment = await prisma.payment.findUnique({
        where: {
            id: paymentId,
        },
        include: {
            rental: {
                include: {
                    gear: true,
                },
            },
        },
    });
    if (payment?.customerId !== userId) {
        throw new AppError(httpStatus.FORBIDDEN, "You are not authorized to view this payment");
    }
    if (!payment) {
        throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
    }
    return payment;
}

export const paymentService = {
    createPaymentIntoDB,
    confirmPaymentIntoDB,
    getAllPaymentFromDB,
    getPaymentByIdFromDB,
};
