import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: customers, isLoading } = useQuery({
    queryKey: ["/api/admin/customers"],
  });

  const filteredCustomers = customers?.filter((customer: any) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLoyaltyBadge = (status: string) => {
    switch (status) {
      case "vip": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "premium": return "bg-gold-100 text-gold-800 dark:bg-gold-900 dark:text-gold-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6" data-testid="text-customers-title">Customers</h1>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle>All Customers ({filteredCustomers?.length || 0})</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-customers"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading customers...</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Total Bookings</TableHead>
                    <TableHead>Loyalty Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers?.map((customer: any) => (
                    <TableRow key={customer.id} data-testid={`row-customer-${customer.id}`}>
                      <TableCell className="font-medium" data-testid={`text-name-${customer.id}`}>
                        {customer.name}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div data-testid={`text-phone-${customer.id}`}>{customer.phone}</div>
                          {customer.email && (
                            <div className="text-sm text-muted-foreground" data-testid={`text-email-${customer.id}`}>
                              {customer.email}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell data-testid={`text-bookings-${customer.id}`}>
                        {customer.totalBookings || 0}
                      </TableCell>
                      <TableCell>
                        <Badge className={getLoyaltyBadge(customer.loyaltyStatus)} data-testid={`badge-loyalty-${customer.id}`}>
                          {customer.loyaltyStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate" data-testid={`text-notes-${customer.id}`}>
                        {customer.notes || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
