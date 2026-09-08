import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";

const Contact = () => {
  return (
    <section
      className="py-24 md:py-32 bg-[rgba(10,10,15,0.5)] backdrop-blur border-t border-[rgba(255,255,255,0.05)]"
    >
      <motion.div
        variants={{
          hidden: { y: -50, opacity: 0 },
          show: { y: 0, opacity: 1, transition: { type: "spring", duration: 1.25 } },
        }}
      >
        <p className="text-secondary text-sm">Get In Touch</p>
        <h2 className="text-2xl font-bold text-white">Contact.</h2>
      </motion.div>

      <div className="max-w-3xl mx-auto text-center">
        <p className="mt-6 text-secondary text-lg leading-relaxed">
          Ready to collaborate on your next project? Let&apos;s talk about how we can
          bring your vision to life. I&apos;m always open to discussing new ideas,
          interesting projects, or just saying hello.
        </p>

        <div className="mt-8 flex justify-center gap-8">
          <a
            href="mailto:hello@lottacodr.com"
            className="group relative px-6 py-3 text-[#0a0a0f] bg-[#cfa96e] text-[#0a0a0f] font-medium rounded-full transition-all duration-300 hover:bg-[#a78755]"
          >
            hello@lottacodr.com
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 0l8 8L4 12z" />
            </svg>
          </a>
          <a
            href="https://wa.me/2349135775141"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 py-3 border border-[#cfa96e] text-[#cfa96e] font-medium rounded-full transition-all duration-300 hover:bg-[#cfa96e] hover:text-[#0a0a0f]"
          >
            WhatsApp
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8a6 6 0 0 0-7.73 5.7 6.6 6.6 0 0 0 2.31 8.84L21 8l-3-3z" />
              <path d="M21 3.19a9 9 0 1 1-2.86 5.82L23 9.19 21 3.19zM4.22 7.25a13 13 0 1 1 1.86-6.78L5.05 9.53 4.22 7.25z" />
            </svg>
          </a>
          <a
            href="https://github.com/LottaCodr"
            className="group relative px-6 py-3 border border-white/5 text-white font-medium rounded-full transition-all duration-300 hover:bg-[#0a0a0f] hover:text-[#cfa96e]"
          >
            GitHub
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 19c-5 1-5-4-7-8a48 48 0 0 0-2-8v-.5a36 36 0 0 0 3-2.8 2 2 0 0 1 1.4 0 12 12 0 0 0 2 2.8c0 2.2-1.4 3.6-3 4a29 29 0 0 0-.5 2.5 12 12 0 0 0-.7 1.2c-.4-.2-.8-.3-1.2-.3-.2 0-.4.1-.5.1a19.2 19.2 0 0 1-3.2-1.6 8 8 0 0 1-1.7-.8c-.2 0-.4.1-.5.1a12 12 0 0 0-4 2.4c-.8-2.1-1.4-4.4-1.4-7 0-2.4 1.5-4.7 3.5-6.1a9.85 9.85 0 0 0 .8-1.3 2 2 0 0 1 1.2-.3 7 7 0 0 1 1.6-.5 4 4 0 0 1 2.3 0 4.5 4.5 0 0 1 1.7.2c.3-.2.5-.3.7-.5a24.6 24.6 0 0 1 1.2-.2 12 12 0 0 0 2 2.8c0 1.4.5 2.6.7 3.8z" />
            </svg>
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.1)]">
          <p className="text-secondary text-sm">
            <strong>Location:</strong> Nigeria<br />
            <strong>Available for:</strong> Freelance & Full-time<br />
            <strong>Response:</strong> Within 24 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Contact, "contact");