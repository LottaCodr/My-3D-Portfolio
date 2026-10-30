import { useState } from "react";
import "./index.css";

import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Works from "./components/Works";
import CaseStudies from "./components/CaseStudies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import { TooltipProvider } from "./components/ui/tooltip";

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    /* Tooltips are supplementary by design, so they are allowed to be slow and
    are skipped on the first hover after one has been shown. */
    <TooltipProvider delayDuration={350} skipDelayDuration={200}>
      {/* Single page-level layout: fixed chrome, one <main>, semantic footer. */}
      <div className="relative min-h-screen w-full bg-bg">
        <ScrollProgress />
        <Navbar onOpenCommand={() => setCommandOpen(true)} />

        <main id="main" tabIndex={-1}>
          <Hero />
          <Marquee />
          <About />
          <Works />
          <CaseStudies />
          <Contact />
        </main>

        <Footer />
        <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      </div>
    </TooltipProvider>
  );
}
