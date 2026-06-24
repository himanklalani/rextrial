"use client";

import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import TextType from "./TextType";

export type HorizontalCardData = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

const defaultCards: HorizontalCardData[] = [
  { id: 1, title: "Dotmatrix Reliability", subtitle: "High-volume invoice printing", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eea6?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, title: "Laser Precision", subtitle: "Enterprise document solutions", image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cb?auto=format&fit=crop&q=80&w=1000" },
  { id: 3, title: "OEM Consumables", subtitle: "Authentic fusers and toners", image: "https://images.unsplash.com/photo-1598440809249-f5424263158c?auto=format&fit=crop&q=80&w=1000" },
  { id: 4, title: "Logic Board Repair", subtitle: "Component-level fixes", image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1000" },
  { id: 5, title: "Maintenance AMC", subtitle: "Zero downtime guarantee", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" },
];

export default function HorizontalScrollGallery({ 
  cards = defaultCards,
  heading = "Featured Capabilities"
}: { 
  cards?: HorizontalCardData[],
  heading?: string
}) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sizerRef = useRef<HTMLDivElement | null>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (!scrollRef.current || !sizerRef.current) return;
    
    const updateMeasurements = () => {
      if (scrollRef.current && sizerRef.current) {
        setScrollRange(scrollRef.current.scrollWidth);
        setContentWidth(sizerRef.current.offsetWidth);
      }
    };

    updateMeasurements();

    const resizeObserver = new ResizeObserver(updateMeasurements);
    resizeObserver.observe(sizerRef.current);
    
    return () => resizeObserver.disconnect();
  }, [cards]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const transform = useTransform(scrollYProgress, [0, 1], [0, -scrollRange + contentWidth]);
  const physics = { damping: 60, mass: 1, stiffness: 500 };
  const spring = useSpring(transform, physics);

  return (
    <section ref={targetRef} className="relative bg-brand-white">
      {/* Sticky viewport container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden py-16">
        
        <div className="absolute top-16 md:top-24 left-8 md:left-16 z-10">
          <TextType 
            as="h2"
            className="text-4xl md:text-5xl font-bold font-outfit text-brand-dark"
            text={heading}
            startOnVisible={true}
            loop={false}
          />
        </div>

        {/* The horizontal track that moves */}
        <motion.div 
          ref={scrollRef}
          style={{ x: spring }} 
          className="flex gap-6 md:gap-12 px-8 md:px-16 w-max mt-16 md:mt-0"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative h-[400px] w-[280px] md:h-[600px] md:w-[450px] overflow-hidden rounded-2xl bg-brand-dark-muted flex-shrink-0 shadow-lg"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-2xl md:text-3xl font-bold font-outfit text-brand-white-pure mb-2 md:mb-3 leading-tight">
                  {card.title}
                </h3>
                <p className="text-brand-gray-light text-base md:text-lg opacity-90">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Invisible sizer element to create the vertical scroll space based on horizontal track width */}
      <div ref={sizerRef} aria-hidden="true" style={{ width: "100%", height: scrollRange ? scrollRange : "300vh" }} />
    </section>
  );
}
