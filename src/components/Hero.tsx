import { ArrowRight } from 'lucide-react';

interface HeroProps {
  setExploreOpen: (open: boolean) => void;
}

export default function Hero({ setExploreOpen }: HeroProps) {
  return (
    <section id="home" className="min-h-screen px-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal animate-fade-rise" style={{ fontFamily: 'var(--font-display)' }}>
        Where <em className="not-italic text-muted-foreground mr-2">stories</em>
        <br />
        rise <em className="not-italic text-muted-foreground">through the silence.</em>
      </h1>
      <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
        Curating timeless literature for deep thinkers, bold creators, and quiet rebels. Amid the chaos, find your focus in our pages.
      </p>
      <button 
        onClick={() => setExploreOpen(true)}
        className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] cursor-pointer animate-fade-rise-delay-2 flex items-center gap-2"
      >
        Explore Collection
        <ArrowRight size={18} />
      </button>
    </section>
  );
}
