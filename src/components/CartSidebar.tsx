import { X, Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../types';

interface CartSidebarProps {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
}

export default function CartSidebar({ cartOpen, setCartOpen, cart, updateQuantity }: CartSidebarProps) {
  return (
    <div
      className={`fixed inset-0 z-[110] transition-opacity duration-500 ease-in-out ${cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-black/80 backdrop-blur-2xl border-l border-white/10 p-8 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>Your Cart</h2>
          <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-white transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {cart.length === 0 ? (
            <p className="text-muted-foreground text-center mt-20">Your cart is silent.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center bg-white/5 p-3 rounded-2xl border border-white/5">
                <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded-lg mix-blend-luminosity" />
                <div className="flex-1">
                  <h4 className="text-lg leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.price}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-white text-muted-foreground cursor-pointer"><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-white text-muted-foreground cursor-pointer"><Plus size={14} /></button>
                  </div>
                </div>
                <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-muted-foreground hover:text-red-400 p-2 cursor-pointer">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex justify-between items-center mb-6 text-lg">
            <span>Subtotal</span>
            <span>${cart.reduce((acc, item) => acc + (parseFloat(item.price.replace('$', '')) * item.quantity), 0).toFixed(2)}</span>
          </div>
          <button className="liquid-glass w-full py-4 text-sm rounded-full text-foreground hover:text-white cursor-pointer transition-transform duration-300">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
