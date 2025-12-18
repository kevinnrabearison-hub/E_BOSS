import { PlayCircleIcon } from "lucide-react";
import { motion } from "framer-motion";

// Composant interne pour les flocons de neige
const SnowLayer = () => {
  const snowflakes = Array.from({ length: 40 }); // 40 flocons pour rester fluide
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((_, i) => {
        const size = Math.random() * 4 + 2; 
        const xPos = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * -20; // Délai négatif pour qu'ils soient déjà là au chargement

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-40 blur-[0.5px]"
            style={{
              width: size,
              height: size,
              left: `${xPos}%`,
              top: -10,
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: ["-15px", "15px", "-15px"],
            }}
            transition={{
              y: { duration, repeat: Infinity, ease: "linear", delay },
              x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        );
      })}
    </div>
  );
};

export default function HeroSection() {
  return (
    <>
      {/* Background avec Blobs et Neige intégrée */}
      <motion.div 
        className="fixed inset-0 overflow-hidden -z-20 pointer-events-none"
        initial={{ opacity: 0.4 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Tes cercles de couleurs (Blobs) */}
        <div className="absolute rounded-full top-80 left-2/5 -translate-x-1/2 size-130 bg-[#D10A8A] blur-[100px]" />
        <div className="absolute rounded-full top-80 right-0 -translate-x-1/2 size-130 bg-[#2E08CF] blur-[100px]" />
        <div className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 size-130 bg-[#F26A06] blur-[100px]" />
        
        {/* La couche de neige par-dessus les blobs mais sous le texte */}
        <SnowLayer />
      </motion.div>

      <motion.section className="flex flex-col items-center">
        {/* Petit Badge en haut */}
        <motion.div className="flex items-center gap-3 mt-32"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
          <p className="text-sm">Smart, Fast, Always Active.</p>
          <button className="btn glass py-1 px-3 text-xs border-white/20">
            Launch App
          </button>
        </motion.div>

        {/* Titre Principal */}
        <motion.h1 className="text-center text-4xl/13 md:text-6xl/19 mt-4 font-semibold tracking-tight max-w-3xl"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
        >
          Build, Deploy & Talk to AI Agents in Seconds.
        </motion.h1>

        {/* Paragraphe Description */}
        <motion.p className="text-center text-gray-100/80 text-base/7 max-w-md mt-6"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
          Design AI assistants that research, plan, and execute tasks — all powered by your prompts.
        </motion.p>

        {/* Boutons d'Action */}
        <motion.div className="flex flex-col md:flex-row max-md:w-full items-center gap-4 md:gap-3 mt-6"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
          <button className="btn max-md:w-full glass py-3 px-8 border-white/10 hover:bg-white/5 transition-all">
            Create Agent
          </button>
          <button className="btn max-md:w-full glass flex items-center justify-center gap-2 py-3 px-8 border-white/10">
            <PlayCircleIcon className="size-4.5" />
            Watch Demo
          </button>
        </motion.div>
      </motion.section>
    </>
  );
}