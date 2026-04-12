import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import Layout from "@/pages/layout";
import Home from "@/pages/home";
import Solutions from "@/pages/solutions";
import HowItWorks from "@/pages/how-it-works";
import About from "@/pages/about";
import BookACall from "@/pages/book-a-call";
import Sources from "@/pages/sources";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";

function Redirect({ to }: { to: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation(to);
  }, [to, setLocation]);
  return null;
}

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
                <Route path="/solutions" component={Solutions} />
                <Route path="/how-it-works" component={HowItWorks} />
                <Route path="/about" component={About} />
                <Route path="/book-a-call" component={BookACall} />
                <Route path="/sources" component={Sources} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/terms" component={Terms} />

                {/* Legacy redirects */}
                <Route path="/contact">{() => <Redirect to="/book-a-call" />}</Route>
                <Route path="/ai-receptionist">{() => <Redirect to="/solutions" />}</Route>
                <Route path="/speed-to-lead">{() => <Redirect to="/solutions" />}</Route>
                <Route path="/ai-booking-system">{() => <Redirect to="/solutions" />}</Route>
                <Route path="/agent-library">{() => <Redirect to="/solutions" />}</Route>

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
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
