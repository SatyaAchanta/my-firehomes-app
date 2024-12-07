'use client';

import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { propertySchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";
import { saveNewProperty } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function NewPropertyForm() {
    const auth = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
        console.log(data);
        const token = await auth?.currentUser?.getIdToken();

        if (!token) {
            return;
        }

        const response = await saveNewProperty({ ...data, token: token });

        if (!!response.error) {
            toast({
                title: "Failure",
                description: "Unable to add new property",
                variant: "destructive"
            });

            return;
        }

        toast({
            title: "Success",
            description: "Added new property successfully",
            variant: "success"
        });

        router.push("/admin-dashboard")
    };

    return <PropertyForm handleSubmit={handleSubmit} submitButtonLabel={
        <>
            <PlusCircleIcon /> Create Property
        </>
    } />;
}

export default NewPropertyForm;