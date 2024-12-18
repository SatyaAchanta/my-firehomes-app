"use client";

import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { propertyFormSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";
import { createProperty } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { storage } from "@/firebase/client";
import { savePropertyImages } from "../actions";

function NewPropertyForm() {
  const auth = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertyFormSchema>) => {
    const token = await auth?.currentUser?.getIdToken();
    const { images, ...propertyDetails } = data;

    if (!token) {
      return;
    }

    const response = await createProperty({ ...propertyDetails }, token);

    if (!!response.error || !response.propertyId) {
      toast({
        title: "Failure",
        description: "Unable to add new property",
        variant: "destructive",
      });

      return;
    }

    const uploadTask: UploadTask[] = [];

    const paths: string[] = [];

    images.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${response.propertyId}/${Date.now()}-${index}-${image.file.name}`;
        paths.push(path);
        const storageRef = ref(storage, path);
        uploadTask.push(uploadBytesResumable(storageRef, image.file));
      }
    });

    await Promise.all(uploadTask);

    await savePropertyImages(
      {
        propertyId: response.propertyId,
        images: paths,
      },
      token,
    );

    toast({
      title: "Success",
      description: "Added new property successfully",
      variant: "success",
    });

    router.push("/admin-dashboard");
  };

  return (
    <PropertyForm
      handleSubmit={handleSubmit}
      submitButtonLabel={
        <>
          <PlusCircleIcon /> Create Property
        </>
      }
    />
  );
}

export default NewPropertyForm;
