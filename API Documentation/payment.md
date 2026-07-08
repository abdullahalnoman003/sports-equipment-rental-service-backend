# Payments API (`/api/payment`)

## 1. Create Payment Intent
- **Endpoint:** `POST /api/payment/create`
- **Description:** Create a Stripe payment intent for a rental order. (Requires Customer Auth)
- **Request Body:**
  ```json
  {
    "rentalId" : "7cf93cc2-e369-45e7-8601-f6b2f643bc2f"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Checkout successful",
    "data": "https://checkout.stripe.com/c/pay/cs_test_a1aZwDQZKzaMRoEOGwyQynH49gvt5njfleZ7ERMWTcseWIJtuIKwSHgeaj#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdicGRmZGhqaWBTZHdsZGtxJz8nZmprcXdqaScpJ2R1bE5gfCc%2FJ3VuWnFgdnFaMDRXbjcyXE1NTWB%2FakNAb1BfNkNodWljV0hiVDdBclx0QkBUTG9dYUpTanZ2UFJOTEFqTDA3MzNyTFRXbmptX19XfUZrRnR2N3RLZzRcS3dKZ2RsSzJTVzE1NWdHZjdCQ2QwJyknY3dqaFZgd3Ngdyc%2FcXdwYCknZ2RmbmJ3anBrYUZqaWp3Jz8nJmNjY2NjYycpJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden`
  - `400 Bad Request`

  - `404 Not Found` (e.g., Rental order not found or does not belong to the authenticated user)
  ```json
  {
    "success": false,
    "statusCode": 404,
    "message": "Rental not found with your user id.",
    "data": {}
  }
  ```

## 2. Confirm Payment Webhook
- **Endpoint:** `POST /api/payment/confirm`
- **Description:** Stripe webhook to confirm payment success.
- **Request Body:** (Stripe Webhook Event Data)
- **Success Response:**
  ```json
  {
  }
  ```
- **Possible Errors:**
  - `400 Bad Request` (e.g., Invalid signature)

## 3. Get Payment History
- **Endpoint:** `GET /api/payment/`
- **Description:** Fetch the payment history of the authenticated customer. (Requires Customer Auth)
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Payments retrieved successfully",
    "data": [
        {
            "id": "cac24e89-3cd1-42e2-b703-d57e83f220ba",
            "rental_id": "7cf93cc2-e369-45e7-8601-f6b2f643bc2f",
            "transaction_id": "cs_test_a1YvKUIGTLD42HPxesKBCXYZSvzxMoW8S12hZISo4r8oWrEEtT78zZMq2g",
            "amount": 2100,
            "provider": "STRIPE",
            "status": "PENDING",
            "paid_at": null,
            "created_at": "2026-07-07T21:12:53.587Z",
            "customerId": "5db32533-3ffe-4628-a22c-e230156bfd88",
            "rental": {
                "id": "7cf93cc2-e369-45e7-8601-f6b2f643bc2f",
                "user_id": "5db32533-3ffe-4628-a22c-e230156bfd88",
                "gear_id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
                "start_date": "2026-07-08T00:00:00.000Z",
                "end_date": "2026-07-15T00:00:00.000Z",
                "status": "PAID",
                "created_at": "2026-07-07T13:45:49.765Z",
                "updated_at": "2026-07-07T20:24:32.773Z",
                "total_price": 2100,
                "gear": {
                    "id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
                    "name": "Tennis Ball",
                    "description": "This is water High Quality Tennnisball",
                    "image": null,
                    "brand": "Tennis GO",
                    "provider_email": "noman10@gmail.com",
                    "price": 300,
                    "quantity": 209,
                    "createdAt": "2026-07-07T07:54:25.141Z",
                    "updatedAt": "2026-07-07T13:45:49.979Z",
                    "category_Name": "Tennis",
                    "provider_id": "63688b87-a066-4c98-ac88-6322706fce21"
                }
            }
        }
    ]
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden`
  ```json
  {
    "success": false,
    "statusCode": 403,
    "message": "You are not authorized to access this resource.",
    "data": {}
  }
  ```
  - `404 Not Found` (e.g., No payments found for the authenticated user)
  ```json
  {
    "success": false,
    "statusCode": 404,
    "message": "No payments found for this user.",
    "data": []
  }
  ```
  

## 4. Get Specific Payment
- **Endpoint:** `GET /api/payment/:id`
- **Description:** Fetch detailed information about a specific payment. (Requires Customer Auth)
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Payment retrieved successfully",
    "data": {
        "id": "cac24e89-3cd1-42e2-b703-d57e83f220ba",
        "rental_id": "7cf93cc2-e369-45e7-8601-f6b2f643bc2f",
        "transaction_id": "cs_test_a1YvKUIGTLD42HPxesKBCXYZSvzxMoW8S12hZISo4r8oWrEEtT78zZMq2g",
        "amount": 2100,
        "provider": "STRIPE",
        "status": "PENDING",
        "paid_at": null,
        "created_at": "2026-07-07T21:12:53.587Z",
        "customerId": "5db32533-3ffe-4628-a22c-e230156bfd88",
        "rental": {
            "id": "7cf93cc2-e369-45e7-8601-f6b2f643bc2f",
            "user_id": "5db32533-3ffe-4628-a22c-e230156bfd88",
            "gear_id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
            "start_date": "2026-07-08T00:00:00.000Z",
            "end_date": "2026-07-15T00:00:00.000Z",
            "status": "PAID",
            "created_at": "2026-07-07T13:45:49.765Z",
            "updated_at": "2026-07-07T20:24:32.773Z",
            "total_price": 2100,
            "gear": {
                "id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
                "name": "Tennis Ball",
                "description": "This is water High Quality Tennnisball",
                "image": null,
                "brand": "Tennis GO",
                "provider_email": "noman10@gmail.com",
                "price": 300,
                "quantity": 209,
                "createdAt": "2026-07-07T07:54:25.141Z",
                "updatedAt": "2026-07-07T13:45:49.979Z",
                "category_Name": "Tennis",
                "provider_id": "63688b87-a066-4c98-ac88-6322706fce21"
            }
        }
    }
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden`
  ```json
  {
    "success": false,
    "statusCode": 403,
    "message": "You are not authorized to view this payment",
    "data": {}
  }
  ```
  - `404 Not Found` (e.g., Payment not found)
  ```json
  {
    "success": false,
    "statusCode": 404,
    "message": "Payment not found",
    "data": {}
  }
  ```
