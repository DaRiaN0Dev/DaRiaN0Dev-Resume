"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function Modal({ open, onClose, title, message }: ModalProps) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          className="w-[90%] max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-800"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {title}
          </h2>

          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            {message}
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
          >
            OK
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
