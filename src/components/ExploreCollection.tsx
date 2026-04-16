import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import type { Book } from '../types';

interface ExploreCollectionProps {
  exploreOpen: boolean;
  setExploreOpen: (open: boolean) => void;
  books: Book[];
  addToCart: (book: Book) => void;
}

export default function ExploreCollection({ exploreOpen, setExploreOpen, books, addToCart }: ExploreCollectionProps) {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (exploreOpen && scrollWrapperRef.current && scrollContentRef.current) {
      const lenis = new Lenis({
        wrapper: scrollWrapperRef.current,
        content: scrollContentRef.current,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
        cancelAnimationFrame(rafId);
      };
    }
  }, [exploreOpen]);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${exploreOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" onClick={() => setExploreOpen(false)} />

      <div className={`relative h-full w-full max-w-7xl mx-auto flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${exploreOpen ? 'translate-y-0 scale-100' : 'translate-y-24 scale-95'
        }`}>
        <div className="flex justify-between items-center mb-0 shrink-0 px-8 py-10 pt-12 border-b border-white/5">
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
            The Complete Archive
          </h2>
          <button
            onClick={() => setExploreOpen(false)}
            className="text-muted-foreground hover:text-white transition-colors cursor-pointer bg-white/5 hover:bg-white/10 p-3 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />

        {/* Lenis scroll wrapper */}
        <div ref={scrollWrapperRef} className="flex-1 overflow-y-auto hide-scrollbar">
          {/* Lenis scroll content */}
          <div ref={scrollContentRef} className="px-8 py-12 pb-24 min-h-max">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 flex flex-col"
                >
                  <div className="aspect-[2/3] w-full mb-6 overflow-hidden rounded-xl bg-white/5 relative border border-white/5">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 mix-blend-luminosity hover:mix-blend-normal"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2">{book.author}</p>

                    <div className="mt-auto flex justify-between items-end pt-6">
                      <p className="text-lg text-foreground/90 font-medium">{book.price}</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(book);
                        }}
                        className="bg-white/10 hover:bg-white/20 px-5 py-2 text-xs rounded-full text-foreground/90 hover:text-white cursor-pointer transition-colors duration-300"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
