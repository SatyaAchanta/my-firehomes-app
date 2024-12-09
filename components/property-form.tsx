'use client';

import { propertySchema } from "@/validation/propertySchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type PropertyFormProps = {
    handleSubmit: (data: z.infer<typeof propertySchema>) => void;
    submitButtonLabel: React.ReactNode;
    defaultValues: z.infer<typeof propertySchema>;
}

function PropertyForm({ handleSubmit, submitButtonLabel, defaultValues }: PropertyFormProps) {

    const combinedDefaultValues: z.infer<typeof propertySchema> = {
        ... {
            address1: "",
            address2: "",
            city: "",
            zip: "12345",
            price: 10.00,
            description: "",
            bedrooms: 1,
            bathrooms: 1,
            status: "draft",
        },
        ...defaultValues,
    };

    // handling data validation with zod
    const form = useForm<z.infer<typeof propertySchema>>({
        resolver: zodResolver(propertySchema),
        defaultValues: combinedDefaultValues,
    });
    return (
        /**
         * Must Read: Why are we implementing forms in this way using ShadCn ?
         * It is because React Hook Forms internally handle React Context related to forms
         * and we do not need to maintian state of the form separately.
         * 
         * So form validation happens without React Context and also changes to form values
         * are stored in the form variable
         */
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <fieldset className="flex flex-col gap-2" disabled={form.formState.isSubmitting}>
                        <FormField control={form.control} name="status" render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="for-sale">For Sale</SelectItem>
                                                <SelectItem value="withdrawn">Withdrawn</SelectItem>
                                                <SelectItem value="sold">Sold</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField control={form.control} name="address1" render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Line 1</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField control={form.control} name="address2" render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Line 2</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField control={form.control} name="city" render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField control={form.control} name="zip" render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>Zip</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                    </fieldset>
                    <fieldset className="flex flex-col gap-2" disabled={form.formState.isSubmitting}>
                        <FormField control={form.control} name="price" render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField control={form.control} name="bedrooms" render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>Bedrooms</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField control={form.control} name="bathrooms" render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>Bathrooms</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField control={form.control} name="description" render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={5} className="resize-none" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                    </fieldset>
                    <Button type="submit" className="max-w-md mx-auto mt-2 w-full flex gap-2">
                        {submitButtonLabel}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default PropertyForm;