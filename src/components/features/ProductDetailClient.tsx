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
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Inquire Quote via WhatsApp
                </span>
              </a>
            </motion.div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}
