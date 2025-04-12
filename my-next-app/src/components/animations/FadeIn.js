import { useState } from 'react';
import { motion } from 'framer-motion';

export default function HoverEffect({ children, scale = 1.05, duration = 0.3 }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
}