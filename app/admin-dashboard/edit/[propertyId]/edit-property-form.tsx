'use client';

import PropertyForm from "@/components/property-form";
import { Property } from "@/types";
import { propertySchema } from "@/validation/propertySchema";
import { z } from "zod";

type Props = Property;

const EditPropertyForm = ({
    id,
    address1,
    address2,
    city,
    zipCode,
    bathRooms,
    bedRooms,
    description,
    price,
    status,
}: Props) => {

    return (
        <PropertyForm defaultValues={
            {
                address1,
                address2,
                city,
                zip: zipCode,
                bathrooms: bathRooms,
                bedrooms: bedRooms,
                description,
                price,
                status,
            }
        } handleSubmit={() => { }} submitButtonLabel="Save Property" />
    );
};

export default EditPropertyForm;