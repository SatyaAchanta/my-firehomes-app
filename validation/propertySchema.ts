import { z, ZodObject } from "zod";

export const propertySchema = z.object({
    address1: z.string().min(1, "Address is required"),
    address2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    zip: z.string().min(5, "Zip is required"),
    price: z.coerce.number().positive("Price must be positive"),
    description: z.string().min(40, "Description must contain at least 40 characters"),
    bedrooms: z.coerce.number().min(1, "There must be at least one bed room"),
    bathrooms: z.coerce.number().min(1, "There must be at least one bathroom"),
    status: z.enum(["draft", "for-sale", "withdrawn", "sold"]),
});

export const propetyImagesSchema = z.object({
    images: z.array(z.object({
        id: z.string(),
        url: z.string(),
        file: z.instanceof(File).optional(),
    }))
});

export const propertyFormSchema = propertySchema.and(propetyImagesSchema);