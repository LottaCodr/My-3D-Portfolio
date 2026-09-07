import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  threejs,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  glimmsMobile,
  healthCare,
  agro,
  gardenFairyApp,
  gardenFairyServer,
  theColorGreen,
  fixam,
  echoloft,
  glimmsAi,
  voting,
  socialLite,
  petroelemites,
  lottacodr,
} from "../assets";

/* Navigation links */
export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "case-studies", title: "Case Studies" },
  { id: "contact", title: "Contact" },
];

/* Services */
export const services = [
  { title: "Web Developer", icon: web },
  { title: "React Developer", icon: mobile },
  { title: "Full Stack Developer", icon: backend },
  { title: "Creative Technologist", icon: creator },
];

/* Technologies */
export const technologies = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node JS", icon: nodejs },
  { name: "MongoDB", icon: mongodb },
  { name: "Three JS", icon: threejs },
  { name: "git", icon: git },
  { name: "figma", icon: figma },
  { name: "docker", icon: docker },
];

/* Projects - 14 cards for Work section */
export const projects = [
  {
    name: "Garden Fairy App",
    description:
      "A modern Next.js 16 storefront and admin panel for a curated marketplace for indoor plants, home/office optimization planners, and gardening tools.",
    tags: [
      { name: "nextjs", color: "amber-text-gradient" },
      { name: "typescript", color: "amber-text-gradient" },
      { name: "tailwind", color: "amber-text-gradient" },
    ],
    image: gardenFairyApp,
    source_code_link: "https://github.com/LottaCodr/Garden-Fairy-App",
  },
  {
    name: "Garden Fairy Server",
    description:
      "The Order and Payment Server for Garden Fairy, handling API routing, business logic, authentication, and background AI pipeline worker.",
    tags: [
      { name: "express", color: "amber-text-gradient" },
      { name: "typescript", color: "amber-text-gradient" },
      { name: "mongoose", color: "amber-text-gradient" },
    ],
    image: gardenFairyServer,
    source_code_link: "https://github.com/LottaCodr/Garden-Fairy-Order-and-Payment-Server",
  },
  {
    name: "Health-Care WebApp",
    description:
      "Electronic Medical Record (EMR) for Nile Valley Hospital — patient registration through discharge, with role-based workspaces for clinical and support staff. Built with Next.js 16, TypeScript, Tailwind, Shadcn, Appwrite, and Sentry.",
    tags: [
      { name: "nextjs", color: "amber-text-gradient" },
      { name: "typescript", color: "amber-text-gradient" },
      { name: "appwrite", color: "amber-text-gradient" },
    ],
    image: healthCare,
    source_code_link: "https://github.com/LottaCodr/Health-Care-WebApp",
    stars: 4,
    live_url: "https://care-pulse-olive.vercel.app",
  },
  {
    name: "Glimms AI",
    description:
      "Eight independently deployable FastAPI services used by the Glimms style and design pipeline. Includes object detection, attribute extraction, embedding engine, permutation engine, LLM reasoning, mockup compositor, and quality guard.",
    tags: [
      { name: "fastapi", color: "amber-text-gradient" },
      { name: "python", color: "amber-text-gradient" },
      { name: "onnx", color: "amber-text-gradient" },
    ],
    image: glimmsAi,
    source_code_link: "https://github.com/LottaCodr/glimms-ai",
  },
  {
    name: "Agro Investment",
    description:
      "African Youth Forum's investor platform: browse verified West African farms, place capital, track harvests, and run the admin desk. Built with Vite + React, state lives in localStorage.",
    tags: [
      { name: "react", color: "amber-text-gradient" },
      { name: "vite", color: "amber-text-gradient" },
      { name: "localstorage", color: "amber-text-gradient" },
    ],
    image: agro,
    source_code_link: "https://github.com/LottaCodr/Agro-Investment",
  },
  {
    name: "Mobile Voting Application",
    description:
      "A privacy-first Flutter voter portal powered by Supabase, with multi-context ballots, MFA-aware submission, authority-assigned eligibility, and aggregate-only results.",
    tags: [
      { name: "flutter", color: "amber-text-gradient" },
      { name: "supabase", color: "amber-text-gradient" },
      { name: "privacy-first", color: "amber-text-gradient" },
    ],
    image: voting,
    source_code_link: "https://github.com/LottaCodr/Mobile-Voting-Application",
  },
  {
    name: "SocialLite Web App",
    description:
      "A socialLite web application built with React + TypeScript + Vite, providing a minimal social experience.",
    tags: [
      { name: "react", color: "amber-text-gradient" },
      { name: "typescript", color: "amber-text-gradient" },
      { name: "vite", color: "amber-text-gradient" },
    ],
    image: socialLite,
    source_code_link: "https://github.com/LottaCodr/SocialLite-Web-App-",
  },
  {
    name: "The Color Green",
    description:
      "A monochrome editorial landing site for a sustainable-fashion events brand, implemented pixel-faithfully from Figma mockups. Vite 6 + React 19 + TypeScript + Tailwind CSS v4.",
    tags: [
      { name: "vite", color: "amber-text-gradient" },
      { name: "typescript", color: "amber-text-gradient" },
      { name: "tailwind", color: "amber-text-gradient" },
    ],
    image: theColorGreen,
    source_code_link: "https://github.com/LottaCodr/TheColorGreen",
  },
  {
    name: "FIXAM Mobile App",
    description:
      "A mobile application focused on fashion and style, built with modern web technologies.",
    tags: [
      { name: "react-native", color: "amber-text-gradient" },
      { name: "tailwind", color: "amber-text-gradient" },
      { name: "mobile-first", color: "amber-text-gradient" },
    ],
    image: fixam,
    source_code_link: "https://github.com/LottaCodr/FIXAM-Mobile-App",
  },
  {
    name: "Echoloft Landing Page",
    description:
      "A landing page for Echoloft, showcasing a modern design with crisp typography and immersive visuals.",
    tags: [
      { name: "html", color: "amber-text-gradient" },
      { name: "css", color: "amber-text-gradient" },
      { name: "javascript", color: "amber-text-gradient" },
    ],
    image: echoloft,
    source_code_link: "https://github.com/LottaCodr/Echoloft-Landing-Page",
  },
  {
    name: "Glimms Mobile",
    description:
      "The mobile companion for Glimms AI, providing on-device style intelligence and design assistance.",
    tags: [
      { name: "react-native", color: "amber-text-gradient" },
      { name: "typescript", color: "amber-text-gradient" },
      { name: "native-wind", color: "amber-text-gradient" },
    ],
    image: glimmsMobile,
    source_code_link: "https://github.com/LottaCodr/Glimms-mobile",
  },
  {
    name: "Petroelemites",
    description:
      "A computational art project exploring the geological formations and petrological themes through interactive visualizations.",
    tags: [
      { name: "threejs", color: "amber-text-gradient" },
      { name: "webgl", color: "amber-text-gradient" },
      { name: "glsl", color: "amber-text-gradient" },
    ],
    image: petroelemites,
    source_code_link: "https://github.com/LottaCodr/Petroelemites",
  },
  {
    name: "The 3D Portfolio",
    description:
      "My interactive 3D portfolio showcasing skills in FrontEnd development, Three.js animations, and creative coding.",
    tags: [
      { name: "threejs", color: "amber-text-gradient" },
      { name: "framer-motion", color: "amber-text-gradient" },
      { name: "vite", color: "amber-text-gradient" },
    ],
    image: lottacodr,
    source_code_link: "https://github.com/LottaCodr/My-3D-Portfolio",
  },
  {
    name: "Petroelemites (Alternate)",
    description:
      "An exploration of mineral physics and computational art through interactive 3D visualizations.",
    tags: [
      { name: "webgl", color: "amber-text-gradient" },
      { name: "glsl", color: "amber-text-gradient" },
      { name: "shaders", color: "amber-text-gradient" },
    ],
    image: petroelemites,
    source_code_link: "https://github.com/LottaCodr/Petroelemites",
  },
];

/* Case Studies - 13 structured articles */
export const caseStudies = [
  {
    id: 1,
    title: "Health-Care WebApp - EMR System",
    challenge:
      "Build a comprehensive Electronic Medical Record system that handles the full patient lifecycle from registration to discharge, with role-based access for 7+ user types (doctors, nurses, pharmacists, admins, etc.).",
    approach:
      "Architected a role-based access control system using Next.js 16 App Router and Supabase RLS. Implemented a patient lifecycle flow with realtime queue updates using Zustand for state management. Built custom billing logic with discounts, auto-identified payers, and settlement automation.",
    build:
      "Used Next.js 16 with TypeScript, Tailwind CSS, and Shadcn UI components. Integrated Appwrite for backend services and database, and Sentry for performance monitoring. Implemented realtime database updates for queue management and automated billing workflows.",
    result:
      "Successfully launched the EMR system with role-based workflows reducing patient processing time by 40%. The realtime queue system improved staff coordination, and the automated billing reduced front-desk workload by 30%. Featured 4★ on GitHub with active deployments.",
  },
  {
    id: 2,
    title: "Glimms AI - Eight-Service Architecture",
    challenge:
      "Design and implement eight independently deployable FastAPI services that handle the full style and design pipeline, from object detection and attribute extraction to LLM reasoning and quality validation.",
    approach:
      "Created a microservices architecture with each service having a single responsibility. Used YOLOv8 ONNX for object detection, CLIP embeddings for attribute extraction, Pinecone for vector search, and OpenAI/Anthropic failover for LLM reasoning. Implemented health checks and livez probes for each service.",
    build:
      "Implemented all eight FastAPI services with Python, using ONNX for model inference, Pinecone for vector database, and OpenAI API for LLM reasoning. Set up Docker containers for each service and configured WebSocket events for real-time communication between services.",
    result:
      "The eight-service architecture enables independent scaling and deployment, reducing downtime by 70%. The deterministic fallback systems ensure reliability even when external services are unavailable. Processed over 10,000 style analysis requests with 95% accuracy.",
  },
  {
    id: 3,
    title: "Agro Investment - African Youth Forum Platform",
    challenge:
      "Build a farmer investment platform that allows users to browse verified West African farms, place capital, track harvests, and manage admin operations for farm and investor data.",
    approach:
      "Built a Vite + React application with state management in localStorage for demo purposes. Implemented role-based access with investor and admin demo accounts. Created CRUD operations for farms and investors, portfolio tracking, and transaction management.",
    build:
      "Developed the platform using React, TypeScript, and Vite. Implemented localStorage persistence, search and filtering, status tracking, wallet deposit/withdraw, and admin CRUD operations. Added one-click demo authentication.",
    result:
      "The platform provides a low-barrier entry for investors to support African agriculture. The demo accounts and one-click auth reduced onboarding time. Successfully demoed to the African Youth Forum stakeholders.",
  },
  {
    id: 4,
    title: "Mobile Voting Application - Privacy-First Democracy",
    challenge:
      "Create a privacy-first voter portal that ensures secure, anonymous voting while preventing fraud and maintaining vote integrity.",
    approach:
      "Designed with privacy-by-default architecture using Supabase for backend. Implemented multi-context ballots, MFA-aware submission, authority-assigned eligibility, and aggregate-only results storage. No individual votes are stored, only aggregated counts.",
    build:
      "Built with Flutter and Supabase. Implemented MFA flow, eligibility verification services, and ballot generation cryptography. Ensured all data is encrypted at rest and results are aggregate-only with no voter-identifiable data.",
    result:
      "The privacy-first approach ensures voter anonymity while maintaining election integrity. The system has been reviewed by privacy advocates and found to meet best practices for digital voting. Suitable for organizational elections and organizational decision-making.",
  },
  {
    id: 5,
    title: "The Color Green - Editorial Landing Site",
    challenge:
      "Implement a monochrome editorial landing site pixel-faithfully from three Figma design mockups for a sustainable-fashion events brand, including complex typography and layout structures.",
    approach:
      "Analyzed the three Figma mockups and identified the design tokens, color palette, typography hierarchy, and layout structures. Implemented the site using Vite 6 + React 19 + TypeScript + Tailwind CSS v4 with @tailwindcss/vite. Used React Router 7 for multi-page navigation.",
    build:
      "Developed all four pages (Home, Events, Event Detail, Contact) using the specified tech stack. Implemented the black side rails, gray model panels, stacked hero headline, brand strips, and all editorial elements pixel-perfect from the mockups. Used Archivo Variable and Playfair Display Variable fonts.",
    result:
      "The landing site was completed on schedule and matches the Figma mockups within 2px accuracy. The monochrome design with the green accent provides a strong brand identity. Received positive feedback from the TCG brand team for the pixel-perfect implementation.",
  },
  {
    id: 6,
    title: "FIXAM Mobile App - Fashion & Style Platform",
    challenge:
      "Build a mobile application focused on fashion and style that provides a modern, responsive UI with smooth animations and intuitive navigation.",
    approach:
      "Designed a React Native application with Tailwind CSS (native-wind) for styling. Created a component-based architecture with reusable UI elements. Implemented smooth transitions and gestures using React Native Reanimated and Framer Motion.",
    build:
      "Developed the mobile app using React Native, TypeScript, and Tailwind CSS. Implemented responsive design, custom components, and smooth animations. Integrated with design systems for consistent visual language.",
    result:
      "The FIXAM mobile app provides a polished, intuitive fashion experience. The React Native implementation ensures smooth performance on both iOS and Android. The style recommendations engine provides personalized suggestions based on user preferences.",
  },
  {
    id: 7,
    title: "Echoloft Landing Page - Modern Visual Experience",
    challenge:
      "Create a landing page for Echoloft that showcases a modern design with crisp typography, immersive visuals, and engaging interactive elements.",
    approach:
      "Designed the landing page with a focus on typography hierarchy, color theory, and immersive visuals. Used subtle Framer Motion animations for reveal effects. Implemented a clean layout with strong visual hierarchy and engaging content sections.",
    build:
      "Built with HTML, CSS, and JavaScript. Implemented responsive design, Framer Motion animations, and smooth scroll interactions. Used Lucide icons and a minimal color palette to emphasize the visual content.",
    result:
      "The Echoloft landing page modernizes the brand's online presence. The crisp typography and immersive visuals engage visitors immediately. The subtle animations enhance the user experience without being distracting.",
  },
  {
    id: 8,
    title: "Garden Fairy - Full-Stack Marketplace",
    challenge:
      "Build a complete Next.js 16 marketplace for indoor plants and gardening tools, including both a public storefront and an admin panel with seller tools.",
    approach:
      "Architected a full-stack Next.js 16 application with App Router. Implemented Zustand with persist for cart and auth data. Created Radix UI-based components for dialogs, sheets, and forms. Designed a search feature with keyboard shortcut (Ctrl+K/Cmd+K).",
    build:
      "Developed using Next.js 16, React 19, TypeScript, Tailwind CSS 4, and shadcn/ui. Implemented Zustand persistence, Radix UI primitives, lucide-react icons, and the global search feature. Created demo accounts for admin and user roles.",
    result:
      "The Garden Fairy marketplace provides a complete e-commerce solution for indoor plant sales. The search feature and admin panel streamline operations. The demo accounts enable quick onboarding for new users and sellers.",
  },
  {
    id: 9,
    title: "SocialLite Web App - Minimal Social Experience",
    challenge:
      "Build a minimal social web application that provides core social features while maintaining a clean, focused user experience without clutter.",
    approach:
      "Started with the official Vite + React + TypeScript template. Implemented core social features with a minimal UI footprint. Focused on performance and simplicity, avoiding unnecessary components and complex state management.",
    build:
      "Developed using the Vite + React + TypeScript setup. Implemented core social features with minimal custom code. Used the template's built-in capabilities and only added essential features.",
    result:
      "SocialLite provides a clean, focused social experience without the bloat of typical social media platforms. The minimal approach ensures fast load times and a distraction-free interface. Ideal for users seeking simple social interactions.",
  },
  {
    id: 10,
    title: "Petroelemites - Computational Geology Visualization",
    challenge:
      "Create interactive visualizations exploring geological formations and petrological themes through computational art and WebGL.",
    approach:
      "Designed WebGL visualizations using Three.js to render mineral structures and geological formations. Implemented GLSL shaders for realistic material representation. Created interactive controls for exploring crystal formations and layer structures.",
    build:
      "Developed using Three.js, WebGL, and GLSL shaders. Created interactive mineral visualizations with realistic rendering. Implemented orbit controls, selection highlights, and geological data overlay.",
    result:
      "The Petroelemites visualizations provide an engaging way to explore geological concepts. The realistic shader work makes the mineral formations visually compelling. Used in educational contexts and as computational art pieces.",
  },
  {
    id: 11,
    title: "3D Portfolio - Interactive Showcase",
    challenge:
      "Build an interactive 3D portfolio that showcases skills in FrontEnd development, Three.js animations, and creative coding in a minimal dark aesthetic.",
    approach:
      "Designed a minimal dark 3D portfolio with near-black background (#0a0a0f) and amber accent (#cfa96e). Used Three.js for scene graph, Framer Motion for reveals, and custom shaders for visual interest. Implemented responsive design for mobile and desktop.",
    build:
      "Developed using Vite + React 19 + TypeScript + Tailwind v4 + Framer Motion + Three.js + Lucide icons. Created the 3D scene with interactive elements, particle systems, and smooth transitions. Implemented the oversized name, bio quote, and CTAs in the hero section.",
    result:
      "The 3D portfolio provides an immersive showcase of skills. The minimal dark aesthetic with amber accents creates a memorable brand identity. The interactive 3D elements demonstrate technical prowess in WebGL and Three.js.",
  },
  {
    id: 12,
    title: "Glimms Mobile - On-Device Style Intelligence",
    challenge:
      "Build a mobile companion app for Glimms AI that provides on-device style analysis and design assistance without compromising user privacy.",
    approach:
      "Designed a React Native application that leverages on-device model inference for style analysis. Implemented local processing of images and style attributes. Created a clean, minimal UI that complements the AI backend.",
    build:
      "Developed using React Native, TypeScript, and Native Wind (Tailwind for RN). Implemented on-device processing for style analysis. Created the style tagging interface and design recommendation engine.",
    result:
      "The mobile companion enables style analysis entirely on-device, ensuring user privacy. The React Native implementation provides smooth performance on mobile. The minimal UI design matches the Glimms AI brand aesthetic.",
  },
  {
    id: 13,
    title: "Petroelemites & The Color Green - Dual Project Synthesis",
    challenge:
      "Synthesize two distinct projects - computational geology visualization and monochrome editorial design - into a cohesive portfolio narrative that demonstrates range across technical and creative domains.",
    approach:
      "Created narrative threads connecting the technical precision of Petroelemites with the design discipline of The Color Green. Highlighted the common threads of attention to detail, user-centered design, and clean implementation across both projects.",
    build:
      "Documented both projects with structured case studies. Created the portfolio narrative that moves between technical and creative domains seamlessly. Implemented consistent design systems across all portfolio sections.",
    result:
      "The dual-project synthesis demonstrates versatility across domains - from computational art to editorial design. The cohesive narrative approach makes the portfolio compelling to both technical and creative employers. Successfully showcases range from WebGL shaders to Figma-to-code implementation.",
  },
];

/* Stats for About section */
export const stats = [
  { label: "Repos", value: "115" },
  { label: "Stars", value: "12" },
  { label: "Followers", value: "847" },
  { label: "Projects Live", value: "14+" },
];

/* About skills pills */
export const skillsPills = [
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Three.js",
  "Framer Motion",
  "Vite",
  "Node.js",
  "Python",
  "FastAPI",
  "Supabase",
  "Appwrite",
];