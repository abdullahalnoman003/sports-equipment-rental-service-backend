export interface IGearData {
    name: string;
    description: string;
    image?: string
    price: number;
    quantity: number;
    category_Name: string;
    brand: string;
    provider_id: string;
    provider_email: string;
}

export interface IUpdateGearData {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    quantity?: number;
    category_Name?: string;
    brand?: string;
}

