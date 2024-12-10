'use server';

import { auth, firestore } from "@/firebase/server";
import { propertySchema } from "@/validation/propertySchema";

export const createProperty = async (property: {
    address1: string;
    address2?: string;
    city: string;
    zip: string;
    price: number;
    description: string;
    bedrooms: number;
    bathrooms: number;
    status: "draft" | "for-sale" | "withdrawn" | "sold";
}, token: string) => {

    const verifiedToken = await auth.verifyIdToken(token);

    if (!verifiedToken.admin) {
        return { error: true, message: "You are not authorized to perform this action" };
    }

    const validation = propertySchema.safeParse(property);

    if (!validation.success) {
        return { error: true, message: validation.error.issues[0]?.message ?? "An error occured" };
    }

    const propertyFirestore = await firestore.collection("properties").add({
        ...property,
        created: new Date(),
        updatedDate: new Date(),
    });

    return {
        propertyId: propertyFirestore.id,
    }
};