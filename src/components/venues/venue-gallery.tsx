"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function VenueGallery({ images, name }: { images: string[]; name: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-3xl ring-1 ring-white/10">
        <button
          type="button"
          onClick={() => { setActive(0); setOpen(true); }}
          className="group relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden md:aspect-auto"
        >
          <Image
            src={images[0]}
            alt={name}
            fill
            priority
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
        {images.slice(1, 5).map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setActive(i + 1); setOpen(true); }}
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={src}
              alt={`${name} ${i + 2}`}
              fill
              sizes="(min-width: 1024px) 300px, 25vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
            />
            {i === 3 && (
              <span className="absolute inset-0 grid place-items-center bg-ink-950/60 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                View all
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-ink-950/90 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActive((a) => (a - 1 + images.length) % images.length); }}
              className="absolute left-5 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[16/10] w-[92vw] max-w-5xl overflow-hidden rounded-3xl ring-1 ring-white/15"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[active]} alt={`${name} ${active + 1}`} fill className="object-cover" sizes="92vw" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink-950/60 px-2.5 py-1 text-[11px] text-white ring-1 ring-white/15 backdrop-blur">
                {active + 1} / {images.length}
              </div>
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); setActive((a) => (a + 1) % images.length); }}
              className="absolute right-5 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
