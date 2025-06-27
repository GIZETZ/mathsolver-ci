import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEzoicPageChange } from "@/hooks/useEzoicPageChange";
import Home from "@/pages/home";
import Solve from "@/pages/solve";
import History from "@/pages/history";
import Result from "@/pages/result";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Help from "@/pages/help";
import NotFound from "@/pages/not-found";
import Settings from "@/pages/settings";
import Profile from "@/pages/profile";
import Progress from "@/pages/progress";
import Lessons from "@/pages/lessons";
import Landing from "@/pages/landing";
import SeoLanding from "@/pages/seo-landing";
import PrivacyPolicy from "@/pages/privacy-policy";

// Create a single client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {

  // Gérer automatiquement les changements de page pour Ezoic
  useEzoicPageChange();

  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/solve" component={Solve} />
        <Route path="/result" component={Result} />
        <Route path="/history" component={History} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/help" component={Help} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
