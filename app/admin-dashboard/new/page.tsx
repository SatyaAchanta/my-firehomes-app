import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewPropertyForm from "./new-propety-form";

function NewProperty() {
    return (
        <div>
            <Breadcrumbs items={[{
                label: "Dashboard",
                href: "/admin-dashboard"
            }, {
                label: "New Property"
            }]}></Breadcrumbs>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">New Property</CardTitle>
                </CardHeader>
                <CardContent>
                    <NewPropertyForm />
                </CardContent>
            </Card>
        </div>
    );
}

export default NewProperty;