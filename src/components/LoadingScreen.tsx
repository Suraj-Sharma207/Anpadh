import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 10) + 5;
        return next >= 100 ? 100 : next;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Progress completed → no need to keep interval
      // (React cleanup already handles it on re-render/unmount)
    }
  }, [progress]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Zoom effect on the text
      gsap.to(textContainerRef.current, {
        scale: 20,
        opacity: 0,
        duration: 1.2,
        delay: 0.5, // start after a small pause
        ease: 'power3.inOut',
      });

      // Fade out the entire container shortly after
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.0,
        delay: 0.8,
        ease: 'power2.inOut',
        onComplete: onComplete
      });
    }
  }, [progress, onComplete]);

  // Interpolate the wave's vertical position
  // 0% -> y = 300 (bottom)
  // 100% -> y = -50 (top, past the text)
  const waveY = 300 - (progress / 100) * 350;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#050505] text-white overflow-hidden"
    >
      <div className="relative w-full max-w-4xl px-4 flex flex-col items-center">

        {/* The SVG containing the text and the wave mask */}
        <div ref={textContainerRef} className="relative w-full overflow-visible">
          <svg
            viewBox="0 0 1000 300"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* The Text Clip Path */}
              <clipPath id="text-clip">
                <text
                  x="50%"
                  y="60%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="180"
                  fontWeight="900"
                  letterSpacing="-0.02em"
                  fontFamily="Kalam, cursive"
                >
                  अनपढ़
                </text>
              </clipPath>

              {/* The Wave Path Animation */}
              <style>
                {`
                  @keyframes wave-move {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-1000px); }
                  }
                  .wave-path-animate {
                    animation: wave-move 2.5s linear infinite;
                  }
                `}
              </style>
            </defs>

            {/* Base text (dark gray) */}
            <rect
              width="100%"
              height="100%"
              fill="#222"
              clipPath="url(#text-clip)"
            />

            {/* The liquid wave filling up */}
            <g clipPath="url(#text-clip)">
              <g
                style={{
                  transform: `translateY(${waveY}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <path
                  className="wave-path-animate"
                  fill="#ffffff"
                  d="M 0 30 Q 125 60 250 30 T 500 30 T 750 30 T 1000 30 T 1250 30 T 1500 30 T 1750 30 T 2000 30 L 2000 1000 L 0 1000 Z"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* Progress text indicator */}
        <div className="absolute right-[5%] lg:right-[15%] bottom-[1%] text-white/50 text-sm md:text-base tracking-[0.2em] uppercase font-medium flex items-center space-x-2">
          <span>Loading...</span>
          <span className="w-12 text-right tabular-nums text-white">
            {progress}%
          </span>
        </div>

      </div>
    </div>
  );
}
