import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import Layout from "@/pages/layout";
import Home from "@/pages/home";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/service-detail";
import About from "@/pages/about";
import BookACall from "@/pages/book-a-call";
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
        <Route>
          {() => (
            <Layout>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/services" component={Services} />

                {/* Retired service slugs. Must precede /services/:slug so they win the match. */}
                <Route path="/services/mobile-app-development">{() => <Redirect to="/services/web-development" />}</Route>
                <Route path="/services/speed-to-lead">{() => <Redirect to="/services/crm-system-integrations" />}</Route>
                <Route path="/services/ai-infrastructure">{() => <Redirect to="/services/technical-architecture" />}</Route>
                <Route path="/services/voice-ai">{() => <Redirect to="/services/ai-receptionist" />}</Route>
                <Route path="/services/rag-systems">{() => <Redirect to="/services/ai-powered-applications" />}</Route>
                <Route path="/services/ai-agents">{() => <Redirect to="/services/ai-receptionist" />}</Route>
                <Route path="/services/ml-consulting">{() => <Redirect to="/services" />}</Route>
                <Route path="/services/fine-tuning">{() => <Redirect to="/services" />}</Route>

                <Route path="/services/:slug" component={ServiceDetail} />

                {/* The page moved from /solutions to /services. */}
                <Route path="/solutions">{() => <Redirect to="/services" />}</Route>
                <Route path="/solutions/:slug">
                  {(params) => <Redirect to={`/services/${params.slug}`} />}
                </Route>
                <Route path="/about" component={About} />
                <Route path="/book-a-call" component={BookACall} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/terms" component={Terms} />

                {/* Legacy redirects */}
                <Route path="/how-it-works">{() => <Redirect to="/services" />}</Route>
                <Route path="/contact">{() => <Redirect to="/book-a-call" />}</Route>
                <Route path="/ai-receptionist">{() => <Redirect to="/services/ai-receptionist" />}</Route>
                <Route path="/speed-to-lead">{() => <Redirect to="/services/crm-system-integrations" />}</Route>
                <Route path="/ai-booking-system">{() => <Redirect to="/services/ai-receptionist" />}</Route>
                <Route path="/agent-library">{() => <Redirect to="/services" />}</Route>

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
