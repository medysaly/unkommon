import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/pages/layout";
import Home from "@/pages/home";
import AIReceptionist from "@/pages/ai-receptionist";
import SpeedToLead from "@/pages/speed-to-lead";
import AIBookingSystem from "@/pages/ai-booking-system";
import SocialMediaBot from "@/pages/social-media-bot";
import ExecutiveAssistant from "@/pages/executive-assistant";
import CompanyKnowledgeBot from "@/pages/company-knowledge-bot";
import ContentFactory from "@/pages/content-factory";
import LinkedInAutomation from "@/pages/linkedin-automation";
import SEORankTracker from "@/pages/seo-rank-tracker";
import DHLTrackingBot from "@/pages/dhl-tracking-bot";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
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
              <Route path="/social-media-bot" component={SocialMediaBot} />
              <Route path="/executive-assistant" component={ExecutiveAssistant} />
              <Route path="/company-knowledge-bot" component={CompanyKnowledgeBot} />
              <Route path="/content-factory" component={ContentFactory} />
              <Route path="/linkedin-automation" component={LinkedInAutomation} />
              <Route path="/seo-rank-tracker" component={SEORankTracker} />
              <Route path="/dhl-tracking-bot" component={DHLTrackingBot} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        )}
      </Route>
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
