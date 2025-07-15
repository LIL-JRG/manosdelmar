'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ArrowDown from "@/utils/icons/ArrowDown";

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={() => setIsOpen(!isOpen)} className="bg-white/70 backdrop-blur-lg p-4 sm:p-6 rounded-lg shadow-md mb-4 cursor-pointer">
      <button
        className="w-full flex justify-between items-center text-left font-medium text-base sm:text-lg text-[#3b2e2a] cursor-pointer"
      >
        {question}
        <span
          className={`text-[#a1583c] transition-transform duration-300 font-light ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ArrowDown />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4 text-[#5c4b47]"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
