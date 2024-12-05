'use client';

import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { propertySchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";
import { saveNewProperty } from "./actions";

function NewPropertyForm() {
    const auth = useAuth();

    const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
        console.log(data);
        const token = await auth?.currentUser?.getIdToken();

        if (!token) {
            return;
        }

        const response = await saveNewProperty({ ...data, token: token });
        console.log(data);
    };

    return <PropertyForm handleSubmit={handleSubmit} submitButtonLabel={
        <>
            <PlusCircleIcon /> Create Property
        </>
    } />;
}

export default NewPropertyForm;