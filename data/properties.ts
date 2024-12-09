import { firestore, getTotalPages } from "@/firebase/server";
import { Property, PropertyStatus } from "@/types";
import "server-only"

type GetPropertiesOptions = {
    filters?: {
        minPrice?: number | null;
        maxPrice?: number | null;
        minBedRooms?: number | null;
        status?: PropertyStatus[] | null;
    },
    pagination?: {
        pageSize?: number;
        page?: number;
    }
}

export const getProperties = async (
    options?: GetPropertiesOptions
) => {
    const page = options?.pagination?.page || 1;
    const pageSize = options?.pagination?.pageSize || 10;
    const { minPrice, maxPrice, minBedRooms, status } = options?.filters || {};

    let propertiesQuery = firestore.collection("properties").orderBy("updatedDate", "desc");

    if (minPrice !== null && minPrice !== undefined) {
        propertiesQuery = propertiesQuery.where("price", ">=", minPrice);
    }

    if (maxPrice !== null && maxPrice !== undefined) {
        propertiesQuery = propertiesQuery.where("price", "<=", maxPrice);
    }

    if (minBedRooms !== null && minBedRooms !== undefined) {
        propertiesQuery = propertiesQuery.where("bedRooms", ">=", minBedRooms);
    }

    if (status) {
        propertiesQuery = propertiesQuery.where("status", "in", status);
    }
    const totalPages = await getTotalPages(propertiesQuery, pageSize);

    const propertiesSnapshot = await propertiesQuery.limit(pageSize).offset((page - 1) * pageSize).get();

    const properties = propertiesSnapshot.docs.map((doc) => {
        return ({
            id: doc.id,
            ...doc.data()
        } as Property);
    });

    return {
        data: properties,
        totalPages
    }
};

export const getPropertById = async (id: string) => {
    const propertySnapshot = await firestore.collection("properties").doc(id).get();

    return {
        id: propertySnapshot.id,
        ...propertySnapshot.data()
    } as Property;
};