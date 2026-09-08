import { BrowserRouter } from "react-router-dom";
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

export default function App() {
  return (
    <BrowserRouter>
      {/* Single page-level layout: fixed chrome, one <main>, semantic footer. */}
      <div className="relative min-h-screen w-full bg-bg">
        <ScrollProgress />
        <Navbar />

        <main id="main">
          <Hero />
          <Marquee />
          <About />
          <Works />
          <CaseStudies />
          <Contact />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
