'use server';

import { auth, firestore } from "@/firebase/server";
import { propertySchema } from "@/validation/propertySchema";

export const saveNewProperty = async (property: {
    address1: string;
    address2?: string;
    city: string;
    zip: string;
    price: number;
    description: string;
    bedrooms: number;
    bathrooms: number;
    status: "draft" | "for-sale" | "withdrawn" | "sold";
    token: string;
}) => {

    const { token, ...propertyData } = property;

    const verifiedToken = await auth.verifyIdToken(property.token);

    if (!verifiedToken.admin) {
        return { error: true, message: "You are not authorized to perform this action" };
    }

    const validation = propertySchema.safeParse(propertyData);

    if (!validation.success) {
        return { error: true, message: validation.error.issues[0]?.message ?? "An error occured" };
    }

    const propertyFirestore = await firestore.collection("properties").add({
        ...propertyData,
        created: new Date(),
        updatedDate: new Date(),
    });

    return {
        propertyId: propertyFirestore.id,
    }
};