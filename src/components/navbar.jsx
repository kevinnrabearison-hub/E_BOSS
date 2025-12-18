import { MenuIcon, XIcon, SunIcon, MoonIcon, UserIcon, ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/theme-context";
import { Link, useNavigate } from "react-router-dom";

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
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const links = [
    { name: "Accueil", href: "/" },
    { name: "Contact", href: "/contact" },
    { name: "Support", href: "/support" },
    { name: "A propos", href: "/apropos" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    // Si c'est un lien interne (commence par #) et qu'on est sur la page d'accueil
    if (href.startsWith("#") && window.location.pathname === "/") {
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) elem.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    } else {
      // Sinon, naviguer normalement avec react-router
      navigate(href);
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 z-50 flex w-full items-center justify-between px-4 py-3.5 md:px-16 lg:px-24 transition-all ${
          isScrolled ? "glass backdrop-blur-lg border-b border-white/10" : "bg-transparent"
        }`}
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <ChristmasLights /> {/* Intégration ici */}
        
        <a href="#home" onClick={(e) => scrollToSection(e, "#home")}>
          <img src="/assets/logo.svg" alt="logo" className="h-8.5 w-auto" />
        </a>

        <div className="hidden items-center space-x-8 md:flex">
          {links.map((link) => (
            <Link key={link.name} to={link.href}
              className={`text-sm font-medium transition hover:opacity-70 ${
                theme === 'dark' ? 'text-white/80 hover:text-white' : 'text-gray-900 hover:text-gray-700'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <button onClick={toggleTheme} className="p-2 rounded-full glass transition hover:scale-105">
            {theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center space-x-1 p-2 rounded-full glass transition hover:scale-105"
            >
              <UserIcon className="size-5" />
              <ChevronDownIcon className="size-4" />
            </button>
            
            <AnimatePresence>
              {isUserDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg border border-white/10"
                >
                  <Link 
                    to="/login" 
                    className={`block px-4 py-2 text-sm hover:bg-white/10 rounded-t-lg ${
                      theme === 'dark' ? 'text-white/80 hover:text-white' : 'text-gray-900 hover:text-gray-700'
                    }`}
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className={`block px-4 py-2 text-sm hover:bg-white/10 rounded-b-lg ${
                      theme === 'dark' ? 'text-white/80 hover:text-white' : 'text-gray-900 hover:text-gray-700'
                    }`}
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    Register
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button onClick={() => setIsOpen(true)} className={`md:hidden ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}><MenuIcon className="size-6.5" /></button>
      </motion.nav>

      {/* Mobile Menu ... (garde ton code précédent pour AnimatePresence) */}
    </>
  );
}