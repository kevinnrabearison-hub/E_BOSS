import { MenuIcon, XIcon, SunIcon, MoonIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/theme-context";

// Animation des Lumières de Noël
const ChristmasLights = () => (
  <div className="absolute top-0 left-0 w-full flex justify-around pointer-events-none z-[60] h-1">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1.5 h-2.5 rounded-b-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        animate={{
          backgroundColor: i % 3 === 0 ? ["#ff4d4d", "#b30000", "#ff4d4d"] : 
                           i % 3 === 1 ? ["#4dff4d", "#00b300", "#4dff4d"] : 
                                         ["#ffd700", "#b8860b", "#ffd700"],
          boxShadow: [
            "0 0 5px currentColor",
            "0 0 15px currentColor",
            "0 0 5px currentColor"
          ]
        }}
        transition={{
          duration: 1.5 + Math.random(),
          repeat: Infinity,
          delay: i * 0.1
        }}
        style={{ color: i % 3 === 0 ? '#ff4d4d' : i % 3 === 1 ? '#4dff4d' : '#ffd700' }}
      />
    ))}
  </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const links = [
    { name: "Home", href: "#home" },
    { name: "Agents", href: "#agents" },
    { name: "Use Cases", href: "#use-cases" },
    { name: "Pricing", href: "#pricing" },
    { name: "Docs", href: "#docs" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) elem.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 z-50 flex w-full items-center justify-between px-4 py-3.5 md:px-16 lg:px-24 transition-all ${
          isScrolled ? "glass backdrop-blur-lg border-b border-white/10" : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <ChristmasLights /> {/* Intégration ici */}
        
        <a href="#home" onClick={(e) => scrollToSection(e, "#home")}>
          <img src="/assets/logo.svg" alt="logo" className="h-8.5 w-auto" />
        </a>

        <div className="hidden items-center space-x-8 md:flex">
          {links.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium transition hover:opacity-70 text-white/80 hover:text-white"
            >
              {link.name}
            </a>
          ))}

          <button onClick={toggleTheme} className="p-2 rounded-full glass transition hover:scale-105">
            {theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
          </button>

          <a href="#signup" className="btn glass border-white/10 text-white px-5 py-2 rounded-full text-sm">
            Sign Up
          </a>
        </div>

        <button onClick={() => setIsOpen(true)} className="md:hidden text-white"><MenuIcon className="size-6.5" /></button>
      </motion.nav>

      {/* Mobile Menu ... (garde ton code précédent pour AnimatePresence) */}
    </>
  );
}