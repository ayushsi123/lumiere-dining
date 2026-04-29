import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronRight, Minus, Plus, Trash2, CreditCard } from 'lucide-react';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function Order() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { items, addToCart, removeFromCart, updateQuantity, total } = useCart();
  const [activeTab, setActiveTab] = useState<'Pickup' | 'Delivery'>('Pickup');
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.order-header', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      
      gsap.from('.order-sidebar', {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });
    }, containerRef.current!);
    return () => ctx.revert();
  }, []);

  const handleCheckout = () => {
    if (items.length === 0) return;
    // Mock checkout process
    navigate('/order/status/LUM-' + Math.random().toString(36).substr(2, 6).toUpperCase());
  };

  return (
    <div ref={containerRef} className="pt-32 md:pt-40 pb-20 bg-bg-dark min-h-screen text-white overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-12 pt-6 md:pt-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Menu Selection (Left) */}
          <div className="lg:w-3/5 order-header">
            <div className="mb-16">
              <span className="text-primary uppercase tracking-[0.4em] text-[10px] mb-6 block font-bold">House Delicacies</span>
              <h1 className="text-4xl md:text-6xl font-serif mb-6 italic">Order Online</h1>
              <p className="text-white/40 text-sm uppercase tracking-widest leading-relaxed max-w-md">Bring the Lumiére experience to your home. Every dish is handled with the same precision as in our dining room.</p>
            </div>

            {/* Quick Menu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {MENU_ITEMS.map((item) => (
                <div key={item.id} className="bg-bg-card p-6 rounded-sm flex items-center space-x-6 group border border-white/5 hover:border-primary/30 transition-all duration-500 luxury-border">
                  <div className="w-24 h-24 overflow-hidden rounded-sm flex-shrink-0 border border-white/5">
                    <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl italic mb-1">{item.name}</h3>
                    <p className="text-primary font-serif italic">${item.price}</p>
                  </div>
                  <button 
                    onClick={() => addToCart(item)}
                    className="p-3 bg-white/5 hover:bg-primary hover:text-bg-dark text-white rounded-full transition-all duration-300"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar (Right) */}
          <div className="lg:w-2/5 order-sidebar w-full">
            <div className="bg-bg-card rounded-sm shadow-2xl p-6 md:p-10 sticky top-24 md:top-32 border border-white/20">
              <div className="flex items-center space-x-4 mb-10 pb-6 border-b border-white/5">
                <ShoppingBag className="text-primary" size={24} />
                <h2 className="text-2xl font-serif italic">Your Selection</h2>
              </div>

              {/* Order Type Toggle */}
              <div className="flex bg-white/5 rounded-sm p-1 mb-10 border border-white/10">
                {['Pickup', 'Delivery'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type as 'Pickup' | 'Delivery')}
                    className={`flex-1 py-3 text-[10px] uppercase font-bold tracking-[0.2em] transition-all ${
                      activeTab === type ? 'bg-primary text-bg-dark shadow-xl' : 'text-white/30 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Cart Items */}
              <div className="space-y-8 max-h-[400px] overflow-y-auto mb-10 pr-4 hide-scrollbar">
                <AnimatePresence mode="popLayout">
                  {items.length === 0 ? (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-white/20 text-[10px] uppercase tracking-widest font-bold py-16"
                    >
                      Your selection is empty.
                    </motion.p>
                  ) : (
                    items.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center space-x-6 pb-6 border-b border-white/5 last:border-0"
                      >
                        <div className="w-14 h-14 overflow-hidden rounded-sm border border-white/5 flex-shrink-0">
                          <img src={item.image} className="w-full h-full object-cover opacity-70" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium italic font-serif">{item.name}</h4>
                          <p className="text-[10px] text-primary/60 font-bold uppercase tracking-widest italic mt-1">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-4 bg-white/5 rounded-full px-4 py-2 border border-white/10">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-white/40 hover:text-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-[10px] font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-white/40 hover:text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/10 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Totals */}
              <div className="space-y-6 pt-10 border-t border-white/10">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-white/30">
                  <span>Subtotal</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                {activeTab === 'Delivery' && (
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-white/30">
                    <span>Premium Delivery</span>
                    <span className="text-white">$15.00</span>
                  </div>
                )}
                <div className="flex justify-between text-2xl font-serif italic items-baseline border-y border-white/5 py-4">
                  <span>Total</span>
                  <span className="text-primary text-3xl font-serif">${(total + (activeTab === 'Delivery' ? 15 : 0)).toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  className="w-full luxury-button flex items-center justify-center space-x-3 disabled:opacity-30 disabled:cursor-not-allowed group h-14"
                >
                  <CreditCard size={18} />
                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold">Secure Checkout</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
