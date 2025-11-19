import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const contentFormSchema = z.object({
  key: z.string().min(1, "Key is required"),
  section: z.string().min(1, "Section is required"),
  englishText: z.string().min(1, "English text is required"),
  banglaText: z.string().optional(),
});

export default function Content() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);

  const { data: content, isLoading } = useQuery({
    queryKey: ["/api/admin/content"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingContent) {
        return await apiRequest(`/api/admin/content/${editingContent.id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
      } else {
        return await apiRequest("/api/admin/content", {
          method: "POST",
          body: JSON.stringify(data),
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content"] });
      toast({ title: editingContent ? "Content updated" : "Content created" });
      setIsDialogOpen(false);
      setEditingContent(null);
      form.reset();
    },
  });

  const form = useForm<z.infer<typeof contentFormSchema>>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      key: "",
      section: "",
      englishText: "",
      banglaText: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contentFormSchema>) => {
    createMutation.mutate(data);
  };

  const handleEdit = (item: any) => {
    setEditingContent(item);
    form.reset({
      key: item.key,
      section: item.section,
      englishText: item.englishText,
      banglaText: item.banglaText || "",
    });
    setIsDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingContent(null);
      form.reset();
    }
  };

  const groupedContent = content?.reduce((acc: any, item: any) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold" data-testid="text-content-title">Content Management</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-content">
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingContent ? "Edit Content" : "Add New Content"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., hero_headline" data-testid="input-key" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., hero, about, services" data-testid="input-section" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="englishText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>English Text</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} data-testid="textarea-english" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="banglaText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bangla Text (Optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} data-testid="textarea-bangla" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={createMutation.isPending} data-testid="button-submit-content">
                  {createMutation.isPending ? "Saving..." : editingContent ? "Update Content" : "Create Content"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div>Loading content...</div>
        ) : (
          Object.entries(groupedContent || {}).map(([section, items]: [string, any]) => (
            <Card key={section}>
              <CardHeader>
                <CardTitle className="capitalize" data-testid={`text-section-${section}`}>{section}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item: any) => (
                    <div
                      key={item.id}
                      className="border rounded-md p-4 hover-elevate"
                      data-testid={`card-content-${item.id}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                        <Badge variant="outline" data-testid={`badge-key-${item.id}`}>{item.key}</Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(item)}
                          data-testid={`button-edit-${item.id}`}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-1">English</div>
                          <p className="text-sm" data-testid={`text-english-${item.id}`}>{item.englishText}</p>
                        </div>
                        {item.banglaText && (
                          <div>
                            <div className="text-sm font-medium text-muted-foreground mb-1">Bangla</div>
                            <p className="text-sm" data-testid={`text-bangla-${item.id}`}>{item.banglaText}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
