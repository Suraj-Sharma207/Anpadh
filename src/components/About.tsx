import React from 'react';
import BookModel from '../BookModel';

interface AboutProps {
  aboutTextRef: React.RefObject<HTMLDivElement>;
}

export default function About({ aboutTextRef }: AboutProps) {
  return (
    <section id="about" className="min-h-screen flex items-center px-6 py-24 max-w-7xl mx-auto w-full relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full h-full items-center">
        <div ref={aboutTextRef} className="flex flex-col justify-center">
          <h2 className="text-5xl mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            The Architecture of Thought
          </h2>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              At Anpadh, we don't just sell books; we curate experiences. Each volume in our collection is selected not for its popularity, but for its profound capacity to alter perspectives and deepen understanding.
            </p>
            <p>
              In an age of relentless digital noise and fleeting attention, a well-crafted book remains a sanctuary. Our selections span from contemporary philosophy to esoteric literature, bound together by a single thread: the power of deep, uninterrupted thought.
            </p>
            <p>
              Discover beautiful editions that demand your time, reward your curiosity, and deserve a permanent place on your shelf.
            </p>
          </div>
        </div>
        {/* Spline Container */}
        <div className="h-[50vh] md:h-[80vh] w-full rounded-3xl overflow-hidden shadow-2xl relative bg-black/20 border border-white/5 flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <BookModel />
          </div>
          {/* Optional fallback overlay if spline takes time to load */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
