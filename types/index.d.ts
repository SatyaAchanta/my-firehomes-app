export type PropertyStatus = "for-sale" | "draft" | "withdrawn" | "sold";

export type Property = {
    id: string;
    address1: string;
    address2?: string;
    city: string;
    zip: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    status: PropertyStatus;
    createdDate?: Date;
    updatedDate?: Date;
    description: string;
};