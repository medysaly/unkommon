import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "@/pages/layout";
import Home from "@/pages/home";
import AIReceptionist from "@/pages/ai-receptionist";
import SpeedToLead from "@/pages/speed-to-lead";
import AIBookingSystem from "@/pages/ai-booking-system";

import AgentLibrary from "@/pages/agent-library";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Sources from "@/pages/sources";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* Admin routes (no layout) */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />

        {/* Public routes (with layout) */}
        <Route>
          {() => (
            <Layout>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/ai-receptionist" component={AIReceptionist} />
                <Route path="/speed-to-lead" component={SpeedToLead} />
                <Route path="/ai-booking-system" component={AIBookingSystem} />

                <Route path="/agent-library" component={AgentLibrary} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/sources" component={Sources} />
                <Route component={NotFound} />
              </Switch>
            </Layout>
          )}
        </Route>
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
