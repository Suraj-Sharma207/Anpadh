import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import type { Book, CartItem } from './types';
import { books } from './data/books';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Collection from './components/Collection';
import Journal from './components/Journal';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import ExploreCollection from './components/ExploreCollection';
import LoadingScreen from './components/LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      setIsScrolled(scroll > 100);
    });

    function raf(time: number) {
      if (!exploreOpen && !cartOpen) {
        lenis.raf(time);
      }
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll trigger for video overlay blur and fade
    if (videoOverlayRef.current) {
      gsap.to(videoOverlayRef.current, {
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      });
    }

    // Scroll trigger for About Section text entrance
    if (aboutTextRef.current) {
      gsap.fromTo(
        aboutTextRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutTextRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [exploreOpen, cartOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  };

  return (
    <div className="relative min-h-screen text-foreground uppercase-none selection:bg-white/20">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
      />

      {/* Video Overlay (Animated on scroll) */}
      <div
        ref={videoOverlayRef}
        className="fixed inset-0 w-full h-full z-[1] transition-colors duration-300"
        style={{
          backdropFilter: 'blur(0px)',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}
      ></div>

      <Navigation
        isScrolled={isScrolled}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        setCartOpen={setCartOpen}
        handleNavClick={handleNavClick}
      />

      <main className="relative z-10 w-full">
        <Hero setExploreOpen={setExploreOpen} />
        <About aboutTextRef={aboutTextRef} />
        <Collection books={books} addToCart={addToCart} />
        <Journal />
        <Footer />
      </main>

      <CartSidebar
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cart={cart}
        updateQuantity={updateQuantity}
      />

      <ExploreCollection
        exploreOpen={exploreOpen}
        setExploreOpen={setExploreOpen}
        books={books}
        addToCart={addToCart}
      />
    </div>
  );
}

export default App;
