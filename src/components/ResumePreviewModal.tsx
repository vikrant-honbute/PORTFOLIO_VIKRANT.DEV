"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ResumePreviewModalProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  title?: string;
};

export default function ResumePreviewModal({
  open,
  onClose,
  src,
  title = "Resume Preview",
}: ResumePreviewModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const modal = (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close resume preview"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div className="relative z-[1] flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0703] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="h-[72vh] w-full bg-black">
          <iframe
            title="Resume preview"
            src={src}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
