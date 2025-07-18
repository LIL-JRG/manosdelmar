'use client';

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowDown from "@/utils/icons/ArrowDown";

// Tipado claro de props
type FaqItemProps = {
  question: string;
  answer: string;
};

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Medir la altura del contenido solo cuando se abre
  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useLayoutEffect(() => {
    if (open) updateHeight();
  }, [open, updateHeight, answer]);

  // Permite abrir/cerrar con Enter/Espacio para accesibilidad
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg p-4 sm:p-6 rounded-lg shadow-md mb-4">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`faq-content-${question}`}
        className="w-full flex justify-between items-center text-left font-medium text-base sm:text-lg text-[#3b2e2a] cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        <span>{question}</span>
        <span
          className={`text-[#a1583c] transition-transform duration-300 font-light ${open ? "rotate-180" : ""}`}
        >
          <ArrowDown />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-content-${question}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: contentHeight, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden text-[#5c4b47]"
            style={{ pointerEvents: open ? "auto" : "none" }}
          >
            <div ref={contentRef} className="py-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
