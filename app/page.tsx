"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";

import Modal from "@/components/Modal";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// eslint-disable-next-line max-lines-per-function, complexity
export default function HomePage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [modal, setModal] = useState({ open: false, title: "", message: "" });
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["hero", "skills", "experience", "projects", "contact"];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) setActive(id);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (title: string, message: string) =>
    setModal({ open: true, title, message });

  return (
    <main
      className={`scroll-smooth transition-colors duration-300 ${
        theme === "dark"
          ? "bg-neutral-900 text-white"
          : "bg-white text-neutral-900"
      }`}
    >
      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`fixed right-6 bottom-6 z-50 flex size-14 items-center justify-center rounded-full text-3xl shadow-xl transition-all hover:scale-110 active:scale-95 ${
          theme === "dark"
            ? "bg-neutral-800 text-yellow-300"
            : "bg-white text-neutral-800"
        }`}
      >
        {theme === "dark" ? (
          <MdLightMode className="text-2xl" />
        ) : (
          <MdDarkMode className="text-2xl" />
        )}
      </button>

      <Modal
        open={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        title={modal.title}
        message={modal.message}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={scrolled ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 right-0 left-0 z-40 h-16 w-full border-b px-6 backdrop-blur-xl transition-all ${
          theme === "dark"
            ? "border-neutral-700 bg-neutral-800/70"
            : "border-neutral-300 bg-white/70"
        }`}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-center">
          <nav className="hidden gap-10 text-[17px] font-semibold tracking-wide md:flex">
            {[
              { id: "hero", label: "Home" },
              { id: "skills", label: "Skills" },
              { id: "experience", label: "Experience" },
              { id: "projects", label: "Projects" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`transition ${
                  active === item.id
                    ? "text-blue-500"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="absolute top-1/2 left-6 flex -translate-y-1/2 flex-col gap-1.5 md:hidden"
          >
            <span
              className={`h-1 w-6 rounded-sm ${
                theme === "dark" ? "bg-white" : "bg-neutral-900"
              }`}
            />
            <span
              className={`h-1 w-6 rounded-sm ${
                theme === "dark" ? "bg-white" : "bg-neutral-900"
              }`}
            />
            <span
              className={`h-1 w-6 rounded-sm ${
                theme === "dark" ? "bg-white" : "bg-neutral-900"
              }`}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`fixed top-0 left-0 z-50 h-full w-64 p-6 shadow-xl ${
                theme === "dark" ? "bg-neutral-800" : "bg-white"
              }`}
            >
              <div
                className={`flex h-16 items-center justify-between border-b px-5 ${
                  theme === "dark"
                    ? "border-neutral-700 text-white"
                    : "border-neutral-300"
                }`}
              >
                <span className="text-lg font-semibold">Menu</span>
                <button
                  type="button"
                  className="text-3xl"
                  onClick={() => setMenuOpen(false)}
                >
                  ×
                </button>
              </div>

              <nav className="flex flex-col gap-6 p-6 text-lg font-medium">
                {[
                  { id: "hero", label: "Home" },
                  { id: "skills", label: "Skills" },
                  { id: "experience", label: "Experience" },
                  { id: "projects", label: "Projects" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="opacity-80 transition hover:opacity-100"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>

            <motion.div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </>
        )}
      </AnimatePresence>

      <section
        id="hero"
        className={`flex min-h-screen items-center justify-center px-6 pt-32 ${
          theme === "dark"
            ? "bg-neutral-900"
            : "bg-linear-to-b from-neutral-100 to-white"
        }`}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className={`w-full max-w-3xl rounded-3xl border p-14 text-center shadow-2xl backdrop-blur-2xl ${
            theme === "dark"
              ? "border-neutral-700 bg-neutral-800/50"
              : "border-neutral-200 bg-white/50"
          }`}
        >
          <TypeAnimation
            sequence={["Mohammad Ramezani", 1500, "", 400]}
            wrapper="h1"
            speed={44}
            repeat={Infinity}
            className="text-5xl font-extrabold tracking-tight"
          />

          <p className="mt-4 text-lg opacity-80">
            Front-End Developer (React / Next.js)
          </p>
          <p className="mt-8 leading-relaxed opacity-80">
            I am a Front-End Developer with 1.5+ years of experience
            specializing in React.js, Next.js, TypeScript, and TailwindCSS.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/MohammadRamezani-FrontEnd.pdf"
              download
              className="rounded-xl bg-blue-600 px-6 py-2 text-white shadow-md transition hover:bg-blue-700"
            >
              Download Resume
            </a>

            <Link
              href="https://github.com/DaRiaN0Dev"
              className={`rounded-xl px-6 py-2 font-medium shadow-md transition ${
                theme === "dark"
                  ? "bg-neutral-700 hover:bg-neutral-600"
                  : "bg-neutral-200 hover:bg-neutral-300"
              }`}
            >
              GitHub
            </Link>

            <button
              type="button"
              onClick={() =>
                openModal("LinkedIn Status", "لینکدین موقتا در دسترس نیست.")
              }
              className={`rounded-xl px-6 py-2 font-medium shadow-md transition ${
                theme === "dark"
                  ? "bg-neutral-700 hover:bg-neutral-600"
                  : "bg-neutral-200 hover:bg-neutral-300"
              }`}
            >
              LinkedIn
            </button>
          </div>
        </motion.div>
      </section>

      <section id="skills" className="px-6 py-28">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-14 text-center text-4xl font-bold"
        >
          Skills
        </motion.h2>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {[
            "Next.js",
            "React.js",
            "TypeScript",
            "JavaScript",
            "Tailwind CSS",
            "React Query",
            "Material UI",
            "Chart.js",
            "Git",
            "Scrum",
          ].map((skill) => (
            <motion.div
              key={skill}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`rounded-xl border py-4 text-center font-medium shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                theme === "dark"
                  ? "border-neutral-700 bg-neutral-800"
                  : "border-neutral-300 bg-white"
              }`}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="experience"
        className={`px-6 py-28 ${
          theme === "dark" ? "bg-neutral-800" : "bg-neutral-100"
        }`}
      >
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-14 text-center text-4xl font-bold"
        >
          Experience
        </motion.h2>

        <div
          className={`mx-auto max-w-3xl space-y-14 border-l pl-6 ${
            theme === "dark" ? "border-neutral-600" : "border-neutral-300"
          }`}
        >
          {[
            {
              title: "Toppira — Front-End Developer",
              date: "Sep 2025 — Jan 2026 · Remote",
              desc: "Worked on scalable UI architecture.",
            },
            {
              title: "Qbify — Front-End Developer",
              date: "July 2025 — Dec 2025 · Qazvin",
              desc: "Built and maintained dashboard modules.",
            },
            {
              title: "Horton — Front-End Developer",
              date: "Nov 2024 — June 2025 · Remote",
              desc: "Developed SaaS UI screens and management tools.",
            },
          ].map((job) => (
            <motion.div
              key={job.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`relative ml-6 rounded-xl border p-6 shadow-md before:absolute before:top-5 before:-left-8 before:size-4 before:rounded-full before:bg-blue-600 ${
                theme === "dark"
                  ? "border-neutral-600 bg-neutral-800"
                  : "border-neutral-300 bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="opacity-70">{job.date}</p>
              <p className="mt-3 opacity-80">{job.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="px-6 py-28">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-14 text-center text-4xl font-bold"
        >
          Projects
        </motion.h2>

        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          {[
            {
              title: "Pause Menu IRM",
              desc: "Gaming UI + dashboard",
              link: "https://github.com/DaRiaN0Dev/pause-menu-irm",
            },
            {
              title: "Toppira Internal Tools",
              desc: "Internal dashboard services",
              link: "https://toppira.com/",
            },
            {
              title: "Qbify Platform",
              desc: "Business dashboard + analytics",
              restricted: true,
            },
            {
              title: "Horton Learning Platform",
              desc: "Internal LMS",
              link: "https://app.hortonapp.com/",
            },
          ].map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, rotateX: 4, rotateY: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className={`rounded-xl border p-6 shadow-md ${
                theme === "dark"
                  ? "border-neutral-600 bg-neutral-800"
                  : "border-neutral-300 bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 opacity-70">{p.desc}</p>

              {p.restricted ? (
                <button
                  type="button"
                  onClick={() =>
                    openModal(
                      "Access Restricted",
                      "This project is not public or open-source.",
                    )
                  }
                  className={`mt-4 rounded-xl px-5 py-2 text-sm font-medium ${
                    theme === "dark" ? "bg-neutral-700" : "bg-neutral-200"
                  }`}
                >
                  Access Restricted
                </button>
              ) : (
                <a
                  href={p.link}
                  target="_blank"
                  className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-2 text-white shadow-sm hover:bg-blue-700"
                >
                  View Project
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="px-6 py-28 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-8 text-4xl font-bold"
        >
          Contact
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p className="mb-4 opacity-70">
            For work opportunities or collaborations:
          </p>
          <p className="mb-6 text-lg font-medium">
            📞 09912247869 <br />
            📞 09300962664
          </p>
          <a
            href="mailto:ramezanidev@gmail.com"
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            Send Email
          </a>
        </motion.div>
      </section>

      <footer className="py-10 text-center text-sm opacity-60">
        © {new Date().getFullYear()} Mohammad Ramezani — All Rights Reserved.
      </footer>
    </main>
  );
}
