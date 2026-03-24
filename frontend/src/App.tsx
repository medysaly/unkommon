import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "@/pages/layout";
import Home from "@/pages/home";
import Solutions from "@/pages/solutions";
import HowItWorks from "@/pages/how-it-works";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Sources from "@/pages/sources";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
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
                <Route path="/contact" component={Contact} />
                <Route path="/sources" component={Sources} />

                {/* Legacy redirects — old product pages → /solutions */}
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
