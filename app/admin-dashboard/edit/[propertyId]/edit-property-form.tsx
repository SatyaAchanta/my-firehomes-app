'use client';

import PropertyForm from "@/components/property-form";
import { auth } from "@/firebase/client";
import { Property } from "@/types";
import { propertySchema } from "@/validation/propertySchema";
import { z } from "zod";
import { updateProperty } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type Props = Property;

const EditPropertyForm = ({
    id,
    address1,
    address2,
    city,
    zip,
    bathrooms,
    bedrooms,
    description,
    price,
    status,
}: Props) => {

    const router = useRouter();
    const { toast } = useToast();
    const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
        const token = await auth.currentUser?.getIdToken();

        if (!token) {
            return;
        }

        await updateProperty({ ...data, id }, token);
        toast({
            title: "Property Updated",
            variant: "success",
            description: "Your property has been updated successfully",
        });
        router.push("/admin-dashboard");
    };

    return (
        <PropertyForm defaultValues={
            {
                address1,
                address2,
                city,
                zip,
                bathrooms,
                bedrooms,
                description,
                price,
                status,
            }
        } handleSubmit={handleSubmit} submitButtonLabel="Save Property" />
    );
};

export default EditPropertyForm;