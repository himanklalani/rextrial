'use client';

import React, { createContext, useContext, useState } from 'react';

type PreloadContextType = {
  progress: number;
  setProgress: (val: number) => void;
  isLoaded: boolean;
  setIsLoaded: (val: boolean) => void;
};

const PreloadContext = createContext<PreloadContextType>({
  progress: 0,
  setProgress: () => {},
  isLoaded: false,
  setIsLoaded: () => {}
});

export const usePreload = () => useContext(PreloadContext);

export const PreloadProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <PreloadContext.Provider value={{ progress, setProgress, isLoaded, setIsLoaded }}>
      {children}
    </PreloadContext.Provider>
  );
};
