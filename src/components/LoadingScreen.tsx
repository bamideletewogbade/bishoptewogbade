
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onLoadingComplete();
      }, 500); // Additional delay for fade out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-all duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark opacity-80"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-glow-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-glow-pulse animation-delay-1000"></div>
      
      {/* Animated B */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-32 h-32 bg-gradient-to-br from-gold to-gold/80 rounded-2xl flex items-center justify-center animate-loading-bounce shadow-2xl shadow-gold/30">
          <span className="text-6xl font-bold text-gold-foreground animate-loading-pulse">B</span>
        </div>
        
        {/* Loading Text */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gold font-medium animate-fade-in animate-delay-500">
            Loading Portfolio...
          </p>
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-gold rounded-full animate-loading-dot animation-delay-0"></div>
            <div className="w-2 h-2 bg-gold rounded-full animate-loading-dot animation-delay-200"></div>
            <div className="w-2 h-2 bg-gold rounded-full animate-loading-dot animation-delay-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
