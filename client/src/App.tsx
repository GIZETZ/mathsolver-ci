import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import Home from "@/pages/home";
import Solve from "@/pages/solve";
import Result from "@/pages/result";
import History from "@/pages/history";
import About from "@/pages/about";
import Help from "@/pages/help";
import Contact from "@/pages/contact";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/solve" component={Solve} />
        <Route path="/result" component={Result} />
        <Route path="/history" component={History} />
        <Route path="/about" component={About} />
        <Route path="/help" component={Help} />
        <Route path="/contact" component={Contact} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
