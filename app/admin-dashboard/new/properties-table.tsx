import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProperties } from "@/data/properties";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export const PropertiesTable = async ({ page = 1 }: {
    page?: number;
}) => {
    const { data, totalPages } = await getProperties({
        pagination: {
            page,
            pageSize: 2,
        }
    });
    console.log(`totalPages: ${totalPages}`);
    return (
        <>
            {!data && <h1 className="text-center text-zinc-400 py-20 font-bold text-3xl">You have no properties</h1>}
            {data &&
                <Table className="mt-5">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Address</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data.map((property) => {
                                const address = [property.address1, property.address2, property.city, property.zipCode].filter((addressLine) => !!addressLine).join(", ");
                                return (
                                    <TableRow key={property.id}>
                                        <TableCell>{address}</TableCell>
                                        <TableCell>${property.price}</TableCell>
                                        <TableCell>{property.status}</TableCell>
                                        <TableCell>
                                            View /{" "}
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin-dashboard/edit/${property.id}`}>
                                                    <PencilIcon />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell className="text-center" colSpan={4}>
                                {
                                    Array.from({ length: totalPages }).map((_, index) => {
                                        return (
                                            <Button key={index} className="mx-1" variant="outline" asChild>
                                                <Link href={`/admin-dashboard?page=${index + 1}`}>{index + 1}</Link>
                                            </Button>
                                        );
                                    })
                                }
                            </TableCell>

                        </TableRow>
                    </TableFooter>

                </Table>
            }
        </>
    );

};