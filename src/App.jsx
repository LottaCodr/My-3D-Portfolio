import { BrowserRouter } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Works from "./components/Works";
import CaseStudies from "./components/CaseStudies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 w-full min-h-screen">
        <Navbar />

        <Hero />

        <About />

        <Works />

        <CaseStudies />

        <Contact />

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;