import logo from "./logo.svg";
import backend from "./backend.png";
import creator from "./creator.png";
import mobile from "./mobile.png";
import web from "./web.png";

import css from "./tech/css.png";
import docker from "./tech/docker.png";
import figma from "./tech/figma.png";
import git from "./tech/git.png";
import html from "./tech/html.png";
import javascript from "./tech/javascript.png";
import mongodb from "./tech/mongodb.png";
import nodejs from "./tech/nodejs.png";
import reactjs from "./tech/reactjs.png";
import redux from "./tech/redux.png";
import tailwind from "./tech/tailwind.png";
import typescript from "./tech/typescript.png";
import threejs from "./tech/threejs.svg";

/* ---------------------------------------------------------------------------
   Project covers.

   The old files in src/assets/*.png were hand-written SVG source saved with a
   .png extension (400x300, Arial label, 335-650 bytes) — see
   docs/ux-research.md §2.1 B1. They only rendered because browsers sniff
   content type, and they break under X-Content-Type-Options: nosniff.

   These are real raster images at 16:10, matching the aspect-ratio the
   ProjectCard reserves so the grid never shifts on load.
   ------------------------------------------------------------------------- */
import coverHealthCare from "./covers/health-care.webp";
import coverGardenFairy from "./covers/garden-fairy.webp";
import coverGardenFairyServer from "./covers/garden-fairy-server.webp";
import coverGlimmsAi from "./covers/glimms-ai.webp";
import coverGlimmsWaitlist from "./covers/glimms-waitlist.webp";
import coverAgro from "./covers/agro.webp";
import coverVoting from "./covers/voting.webp";
import coverColorGreen from "./covers/the-color-green.webp";
import coverEcholoft from "./covers/echoloft.webp";
import coverPetroelemites from "./covers/petroelemites.webp";

export {
  logo,
  backend,
  creator,
  mobile,
  web,
  css,
  docker,
  figma,
  git,
  html,
  javascript,
  mongodb,
  nodejs,
  reactjs,
  redux,
  tailwind,
  typescript,
  threejs,
  /* Project covers */
  coverHealthCare,
  coverGardenFairy,
  coverGardenFairyServer,
  coverGlimmsAi,
  coverGlimmsWaitlist,
  coverAgro,
  coverVoting,
  coverColorGreen,
  coverEcholoft,
  coverPetroelemites,
};
