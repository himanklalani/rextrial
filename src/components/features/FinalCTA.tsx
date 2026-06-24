'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TextType from '@/components/ui/TextType';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GlowHorizonFM from '@/components/ui/glow-horizon';

export default function FinalCTA() {
  return (
    <section className="bg-brand-dark text-brand-white-pure py-32 md:py-48 relative z-10 overflow-hidden">
      <GlowHorizonFM variant="bottom" className="opacity-60" />
      
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <h1 className="text-[20vw] font-bold font-outfit leading-none select-none text-brand-white-pure">REX</h1>
      </div>

      <div className="container-inner max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <TextType 
            as="h2"
            className="text-5xl md:text-7xl font-bold font-outfit leading-tight mb-8 text-brand-white-pure"
            text={"Ready to upgrade your\nprinting infrastructure?"}
            typingSpeed={50}
            startOnVisible={true}
            loop={false}
          />
          <p className="text-xl md:text-2xl text-brand-white-pure/80 mb-12">
            Speak directly with our enterprise hardware specialists today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="group relative inline-flex items-center justify-center bg-brand-white-pure text-brand-dark px-12 py-5 rounded-full font-bold text-lg overflow-hidden w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
              <span className="relative z-10 group-hover:-translate-y-12 transition-transform duration-500">Contact Us</span>
              <span className="absolute inset-0 flex items-center justify-center translate-y-12 group-hover:translate-y-0 transition-transform duration-500">Get a Quote</span>
            </Link>
            
            <a href="https://wa.me/919323906493" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 text-brand-white-pure font-bold text-lg px-8 py-5 hover:text-brand-gray-light transition-colors w-full sm:w-auto">
              Chat on WhatsApp
              <motion.span 
                className="inline-block"
                whileHover={{ x: 5 }}
              >→</motion.span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
