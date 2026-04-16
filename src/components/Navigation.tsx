import { ShoppingCart } from 'lucide-react';

interface NavigationProps {
  isScrolled: boolean;
  cartCount: number;
  setCartOpen: (open: boolean) => void;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, target: string) => void;
}

export default function Navigation({ isScrolled, cartCount, setCartOpen, handleNavClick }: NavigationProps) {
  return (
    <nav
      className={`fixed w-full z-50 left-0 right-0 transition-all duration-500 ease-in-out ${isScrolled
        ? 'top-4 px-4 max-w-5xl mx-auto'
        : 'top-0 px-8 max-w-7xl mx-auto py-6'
        }`}
    >
      <div
        className={`flex justify-between items-center w-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isScrolled
          ? 'bg-black/20 backdrop-blur-xl border border-white/10 rounded-full py-4 px-8 shadow-2xl'
          : 'bg-transparent'
          }`}
      >
        <div className="text-3xl tracking-tight text-foreground" style={{ fontFamily: "'Kalam', cursive" }}>
          अनपढ़<sup className="text-xs ml-0.5">®</sup>
        </div>
        <div className="hidden md:flex gap-8 items-center text-sm text-muted-foreground">
          {['Home', 'About', 'Collection', 'Journal', 'Reach Us'].map((item) => {
            const targetId = `#${item.toLowerCase().replace(' ', '-')}`;
            return (
              <a
                key={item}
                href={targetId}
                onClick={(e) => handleNavClick(e, targetId)}
                className="hover:text-foreground transition-colors duration-300"
              >
                {item}
              </a>
            );
          })}
        </div>
        <button onClick={() => setCartOpen(true)} className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] flex items-center gap-2 cursor-pointer">
          <ShoppingCart size={16} />
          Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
}
