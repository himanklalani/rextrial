"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export interface StaggerCardItem {
  tempId?: number;
  title: string;
  content: string;
  imgSrc: string;
}

interface StaggerCardProps {
  position: number;
  item: StaggerCardItem;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const StaggerCard: React.FC<StaggerCardProps> = ({ 
  position, 
  item, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 md:p-8 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-brand-green text-brand-white-pure border-brand-green" 
          : "z-0 bg-brand-white-pure text-brand-dark border-brand-gray/20 hover:border-brand-green/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -30 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(255,255,255,0.1)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className={cn("absolute block origin-top-right rotate-45", isCenter ? "bg-brand-green-light/30" : "bg-brand-gray/20")}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={item.imgSrc}
        alt={item.title}
        className="mb-6 h-16 w-16 object-cover object-top"
        style={{
          boxShadow: isCenter ? "3px 3px 0px rgba(0,0,0,0.2)" : "3px 3px 0px var(--color-brand-gray)"
        }}
      />
      <h3 className={cn(
        "text-lg sm:text-xl font-bold font-outfit mb-3",
        isCenter ? "text-brand-white-pure" : "text-brand-dark"
      )}>
        {item.title}
      </h3>
      <p className={cn(
        "text-sm md:text-base leading-relaxed",
        isCenter ? "text-brand-white-pure/90" : "text-brand-dark-muted"
      )}>
        {item.content}
      </p>
    </div>
  );
};

export const StaggerCards: React.FC<{ items: StaggerCardItem[] }> = ({ items }) => {
  const [cardSize, setCardSize] = useState(320);
  const [itemList, setItemList] = useState<StaggerCardItem[]>([]);

  useEffect(() => {
    setItemList(items.map((item, idx) => ({ ...item, tempId: idx })));
  }, [items]);

  const handleMove = (steps: number) => {
    const newList = [...itemList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setItemList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 340 : 280);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (itemList.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 480 }}
    >
      {itemList.map((item, index) => {
        const position = itemList.length % 2
          ? index - (itemList.length - 1) / 2
          : index - Math.floor(itemList.length / 2);
        return (
          <StaggerCard
            key={item.tempId}
            item={item}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-4 z-20">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-2xl transition-colors rounded-full",
            "bg-brand-dark border-2 border-brand-white-pure/20 text-brand-white-pure hover:bg-brand-green hover:border-brand-green",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
          )}
          aria-label="Previous card"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-2xl transition-colors rounded-full",
            "bg-brand-dark border-2 border-brand-white-pure/20 text-brand-white-pure hover:bg-brand-green hover:border-brand-green",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
          )}
          aria-label="Next card"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
