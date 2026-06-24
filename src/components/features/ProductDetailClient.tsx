'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Product } from '@/types';
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA';

interface Props {
  product: Product;
  whatsappUrl: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function ProductDetailClient({ product, whatsappUrl }: Props) {
  return (
    <div className="container-inner">
      <motion.div 
        className="card-base bg-brand-white-pure p-8 md:p-12 max-w-6xl mx-auto shadow-xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          <motion.div variants={itemVariants} className="bg-brand-white rounded-xl flex items-center justify-center p-12 border border-brand-gray/20 aspect-square relative group overflow-hidden">
            <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {product.imageUrl ? (
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply" 
              />
            ) : (
              <span className="text-brand-dark/30 font-medium">Image Pending</span>
            )}
          </motion.div>
          
          <div className="flex flex-col justify-center">
            

            <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-brand-green mb-6 font-outfit leading-tight">
              {product.name}
            </motion.h1>
            
            <motion.div variants={itemVariants} className="mb-8 pb-8 border-b border-brand-gray/30">
              <span className="text-sm font-bold text-brand-dark-muted uppercase tracking-wide block mb-1">Value Range</span>
              <span className="text-2xl font-bold text-brand-dark">{product.priceRange}</span>
            </motion.div>
            
            <motion.div variants={itemVariants} className="prose max-w-none mb-10">
              <p className="text-brand-dark-muted text-lg leading-relaxed">{product.detailedDescription}</p>
              
              <h3 className="text-lg font-bold text-brand-dark mt-8 mb-4">Key Features</h3>
              <ul className="space-y-3 mb-8">
                {product.features.map((feature, i) => (
                  <motion.li 
                    key={i} 
                    variants={itemVariants}
                    className="flex items-start gap-3 text-brand-dark-muted"
                  >
                    <span className="text-brand-green mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span> 
                    {feature}
                  </motion.li>
                ))}
              </ul>

              {product.specifications && (
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-bold text-brand-dark mb-4">Technical Specifications</h3>
                  <div className="bg-brand-gray-light/20 rounded-lg overflow-hidden border border-brand-gray/20">
                    <table className="w-full text-sm text-left">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value], idx) => (
                          <tr key={key} className={idx !== 0 ? "border-t border-brand-gray/20" : ""}>
                            <th className="py-3 px-4 font-semibold text-brand-dark bg-brand-white/50 w-1/3">{key}</th>
                            <td className="py-3 px-4 text-brand-dark-muted">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {product.useCases && product.useCases.length > 0 && (
                <motion.div variants={itemVariants} className="mt-8">
                  <h3 className="text-lg font-bold text-brand-dark mb-4">Ideal Use Cases</h3>
                  <div className="flex flex-col gap-3">
                    {product.useCases.map((useCase, i) => (
                      <div key={i} className="bg-brand-gray-light/10 rounded-lg border border-brand-gray/20 p-4">
                        <p className="font-semibold text-brand-dark text-sm mb-1">{useCase.title}</p>
                        <p className="text-brand-dark-muted text-sm leading-relaxed">{useCase.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-auto pt-8 border-t border-brand-gray/20">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto overflow-hidden rounded-md bg-brand-dark px-10 py-4 font-bold text-brand-white-pure transition-all hover:bg-brand-green"
              >
                <span className="absolute right-0 flex h-full w-12 translate-x-full items-center justify-center bg-black/20 transition-all duration-300 group-hover:translate-x-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </span>
                <span className="flex items-center gap-2 transition-all duration-300 group-hover:-translate-x-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Inquire to Purchase
                </span>
              </a>
            </motion.div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}
