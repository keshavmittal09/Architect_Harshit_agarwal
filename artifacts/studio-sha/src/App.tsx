import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import IntroAnimation from '@/components/IntroAnimation';
import FilmGrain from '@/components/FilmGrain';
import SmoothScroll from '@/components/SmoothScroll';

import Home from '@/pages/Home';
import Studio from '@/pages/Studio';
import Work from '@/pages/Work';
import ProjectDetail from '@/pages/ProjectDetail';
import Contact from '@/pages/Contact';

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        <Switch key={location}>
          <Route path="/" component={Home} />
          <Route path="/studio" component={Studio} />
          <Route path="/work" component={Work} />
          <Route path="/work/:slug" component={ProjectDetail} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
      <Footer />
    </>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('sha-intro-v3');
    if (!hasSeenIntro) {
      setShowIntro(true);
      sessionStorage.setItem('sha-intro-v3', 'true');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SmoothScroll>
          <FilmGrain />
          {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
        </SmoothScroll>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
