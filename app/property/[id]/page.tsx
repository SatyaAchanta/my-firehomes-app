import React from "react";
import { getPropertById } from "@/data/properties";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const PropertyView = async ({ params }: { params: Promise<any> }) => {
  const paramsValue = await params;
  const property = await getPropertById(paramsValue.id);

  return (
    <div className="grid grid-cols-[1fr_400px]">
      <div>
        Caraousel
        <div className="property-descriptionn max-w-screen-md mx-auto py-10 px-4">
          <Button asChild>
            <Link href="/admin-dashboard">
              <ArrowLeftIcon />
              Back to Properties
            </Link>
          </Button>
          <ReactMarkdown className="py-4">{property.description}</ReactMarkdown>
        </div>
      </div>
      <div className="bg-sky-200 h-screen sticky"></div>
    </div>
  );
};

export default PropertyView;
