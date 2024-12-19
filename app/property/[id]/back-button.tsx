"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  return (
    <Button variant={"link"} onClick={() => router.back()}>
      <ArrowLeftIcon />
      Back to Properties
    </Button>
  );
}

export default BackButton;
