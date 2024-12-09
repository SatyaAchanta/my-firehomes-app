import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { PropertiesTable } from "./new/properties-table";

const AdminDashboard = async ({
    searchParams
}: {
    searchParams?: Promise<any>
}) => {
    const spVal = await searchParams;
    console.log(spVal.page);
    return (
        <div>
            <Breadcrumbs items={
                [
                    { label: "Dashboard" }
                ]
            }></Breadcrumbs>
            <h1 className="text-4xl font-bold mt-6">Admin Dashboard</h1>
            <Button asChild className="inline-flex pl-2 gap-2 mt-4">
                <Link href="/admin-dashboard/new">
                    <PlusCircle className="" /> New Property
                </Link>
            </Button>
            <PropertiesTable page={spVal.page ? parseInt(spVal.page) : 1} />
        </div>
    );
}

export default AdminDashboard;