"use server";

import { auth, firestore } from "@/firebase/server";
import { Property } from "@/types";
import { propertySchema } from "@/validation/propertySchema";

export const updateProperty = async (data: Property, token: string) => {

    const { id, ...propertyData } = data;

    const verifiedToken = await auth.verifyIdToken(token);

    if (!verifiedToken.admin) {
        return { error: true, message: "You are not authorized to perform this action" };
    }

    const validation = propertySchema.safeParse(propertyData);

    if (!validation.success) {
        return { error: true, message: validation.error.issues[0]?.message ?? "An error occured" };
    }

    await firestore.collection("properties").doc(id).update({
        ...propertyData,
        updatedDate: new Date(),
    });
};