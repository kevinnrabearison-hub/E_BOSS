import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const FrostCard = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const background = useTransform(
    [mouseXSpring, mouseYSpring],
    ([cx, cy]) => `radial-gradient(circle at ${cx}px ${cy}px, rgba(255,255,255,0.15) 0%, transparent 70%)`
  );

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] group"
    >
      {/* Effet de Givre Interactif */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background }}
      />
      
      {/* Contenu */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};