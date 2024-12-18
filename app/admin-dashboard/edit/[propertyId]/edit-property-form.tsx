"use client";

import PropertyForm from "@/components/property-form";
import { auth, storage } from "@/firebase/client";
import { Property } from "@/types";
import { propertyFormSchema } from "@/validation/propertySchema";
import { z } from "zod";
import { updateProperty } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { savePropertyImages } from "../../actions";

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
  images = [],
}: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleSubmit = async (data: z.infer<typeof propertyFormSchema>) => {
    const token = await auth.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const { images: newImages, ...propertyData } = data;

    const res = await updateProperty({ ...propertyData, id }, token);

    if (!!res?.error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: res.message,
      });
      return;
    }

    const storageTasks: (UploadTask | Promise<void>)[] = [];

    const imagesToDelete = images.filter((image) =>
      newImages.find((newImage) => image === newImage.url),
    );

    imagesToDelete.forEach((image) => {
      storageTasks.push(deleteObject(ref(storage, image)));
    });

    const paths: string[] = [];

    newImages.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${image.id}/${Date.now()}-${index}-${image.file.name}`;
        paths.push(path);
        const storageRef = ref(storage, path);
        storageTasks.push(uploadBytesResumable(storageRef, image.file));
      } else {
        // if URL exists for image means, not a new image
        paths.push(image.url);
      }
    });

    await Promise.all(storageTasks);
    await savePropertyImages({ propertyId: id, images: paths }, token);

    toast({
      title: "Property Updated",
      variant: "success",
      description: "Your property has been updated successfully",
    });
    router.push("/admin-dashboard");
  };

  return (
    <PropertyForm
      defaultValues={{
        address1,
        address2,
        city,
        zip,
        bathrooms,
        bedrooms,
        description,
        price,
        status,
        images: images.map((image) => ({ id: image, url: image })),
      }}
      handleSubmit={handleSubmit}
      submitButtonLabel="Save Property"
    />
  );
};

export default EditPropertyForm;
