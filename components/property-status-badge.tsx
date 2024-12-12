import { PropertyStatus } from "@/types";
import { Badge } from "./ui/badge";

const statusLabel = {
    "for-sale": "For Sale",
    draft: "Draft",
    sold: "Sold",
    withdrawn: "Withdrawn",
};

const variant: {
    [key: string]: "primary" | "secondary" | "success" | "destructive";
} = {
    "for-sale": "primary",
    draft: "secondary",
    sold: "success",
    withdrawn: "destructive",
}

const PropertyStatusBadge = ({ status, }: {
    status: PropertyStatus
}) => {

    const label = statusLabel[status];

    return (
        <Badge variant={
            variant[status]
        }>{label}</Badge>
    );
};

export default PropertyStatusBadge;