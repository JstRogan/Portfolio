'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface RandomLetterRevealProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export function RandomLetterReveal({
  text,
  className = '',
  duration = 1000,
  delay = 0,
}: RandomLetterRevealProps) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const startAnimation = () => {
      let iteration = 0;
      const totalIterations = text.length;
      const intervalDuration = duration / totalIterations;

      intervalId = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join('')
        );

        if (iteration >= totalIterations) {
          clearInterval(intervalId);
          setDisplayText(text);
          setHasAnimated(true);
        }

        iteration += 1 / 3; // Controls how many times a letter scrambles before resolving
      }, intervalDuration);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isInView, text, duration, delay, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
