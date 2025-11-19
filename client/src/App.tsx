import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Home as HomeIcon } from "lucide-react";
import HomePage from "@/pages/Home";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/admin/Dashboard";
import Bookings from "@/pages/admin/Bookings";
import Customers from "@/pages/admin/Customers";
import Artists from "@/pages/admin/Artists";
import Services from "@/pages/admin/Services";
import Gallery from "@/pages/admin/Gallery";
import Testimonials from "@/pages/admin/Testimonials";
import Content from "@/pages/admin/Content";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-2 px-4 py-3 border-b bg-card text-card-foreground shadow-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="text-sm text-muted-foreground font-medium">Admin Panel</div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/">
                <a className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground hover:opacity-95">
                  <HomeIcon className="w-4 h-4" />
                  <span>Home</span>
                </a>
              </Link>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function Router() {
  return (
    <Switch>
  <Route path="/" component={HomePage} />
      <Route path="/admin">
        {() => <AdminLayout><Dashboard /></AdminLayout>}
      </Route>
      <Route path="/admin/bookings">
        {() => <AdminLayout><Bookings /></AdminLayout>}
      </Route>
      <Route path="/admin/customers">
        {() => <AdminLayout><Customers /></AdminLayout>}
      </Route>
      <Route path="/admin/artists">
        {() => <AdminLayout><Artists /></AdminLayout>}
      </Route>
      <Route path="/admin/services">
        {() => <AdminLayout><Services /></AdminLayout>}
      </Route>
      <Route path="/admin/gallery">
        {() => <AdminLayout><Gallery /></AdminLayout>}
      </Route>
      <Route path="/admin/testimonials">
        {() => <AdminLayout><Testimonials /></AdminLayout>}
      </Route>
      <Route path="/admin/content">
        {() => <AdminLayout><Content /></AdminLayout>}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
