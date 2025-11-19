import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Star, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Testimonials() {
  const { toast } = useToast();

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/admin/testimonials"],
  });

  const approveMutation = useMutation({
    mutationFn: async ({ id, isApproved }: { id: string; isApproved: boolean }) => {
      return await apiRequest(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isApproved }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      toast({ title: "Testimonial updated" });
    },
  });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, isVisible }: { id: string; isVisible: boolean }) => {
      return await apiRequest(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isVisible }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      toast({ title: "Visibility updated" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      toast({ title: "Testimonial deleted" });
    },
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6" data-testid="text-testimonials-title">Testimonials</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <div>Loading testimonials...</div>
        ) : (
          testimonials?.map((testimonial: any) => (
            <Card key={testimonial.id} data-testid={`card-testimonial-${testimonial.id}`}>
              <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium" data-testid={`text-customer-${testimonial.id}`}>
                      {testimonial.customerName}
                    </span>
                    {testimonial.isApproved ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" data-testid={`badge-approved-${testimonial.id}`}>
                        Approved
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" data-testid={`badge-pending-${testimonial.id}`}>
                        Pending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1" data-testid={`rating-${testimonial.id}`}>
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4" data-testid={`text-review-${testimonial.id}`}>
                  "{testimonial.text}"
                </p>
                {testimonial.service && (
                  <Badge variant="outline" className="mb-4" data-testid={`badge-service-${testimonial.id}`}>
                    {testimonial.service}
                  </Badge>
                )}
                <div className="flex flex-wrap items-center gap-2">
                  {!testimonial.isApproved && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() =>
                        approveMutation.mutate({ id: testimonial.id, isApproved: true })
                      }
                      data-testid={`button-approve-${testimonial.id}`}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  )}
                  {testimonial.isApproved && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        approveMutation.mutate({ id: testimonial.id, isApproved: false })
                      }
                      data-testid={`button-unapprove-${testimonial.id}`}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Unapprove
                    </Button>
                  )}
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm">Visible</span>
                    <Switch
                      checked={testimonial.isVisible}
                      onCheckedChange={(checked) =>
                        toggleVisibilityMutation.mutate({ id: testimonial.id, isVisible: checked })
                      }
                      data-testid={`switch-visibility-${testimonial.id}`}
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(testimonial.id)}
                    data-testid={`button-delete-${testimonial.id}`}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
