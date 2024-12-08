export type PropertyStatus = "for-sale" | "draft" | "withdrawn" | "sold";

export type Property = {
    id: string;
    address1: string;
    address2: string;
    city: string;
    zipCode: string;
    price: number;
    bedRooms: number;
    bathRooms: number;
    status: PropertyStatus;
    createdDate: Date;
    updatedDate: Date;
};