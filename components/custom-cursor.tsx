'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('input') || 
        target.closest('textarea')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center text-purple-500 dark:text-emerald-500 drop-shadow-md transition-colors duration-300"
      animate={{
        x: mousePosition.x - 14,
        y: mousePosition.y - 14,
        rotate: isHovering ? 15 : 0,
        scale: isHovering ? 1.2 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }}
    >
      <svg width="28" height="28" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M228,104a28,28,0,1,0-28-28A28,28,0,0,0,228,104ZM84,76a28,28,0,1,0-28-28A28,28,0,0,0,84,76Zm88,0a28,28,0,1,0-28-28A28,28,0,0,0,172,76Zm-16,36H100a44.05,44.05,0,0,0-44,44v24a52,52,0,0,0,52,52h40a52,52,0,0,0,52-52V156A44.05,44.05,0,0,0,156,112Z"/>
      </svg>
    </motion.div>
  );
}
