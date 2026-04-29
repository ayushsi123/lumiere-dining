import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MENU_ITEMS } from '../constants';
import { cn } from '../lib/utils';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const categories = ['All', ...new Set(MENU_ITEMS.map(item => item.category))];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.menu-header', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      });

      gsap.utils.toArray('.menu-item-reveal').forEach((item: any) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    }, containerRef.current!);
    return () => ctx.revert();
  }, [activeCategory]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div ref={containerRef} className="pt-32 md:pt-40 pb-20 bg-bg-dark min-h-screen">
      {/* Header */}
      <section className="container mx-auto px-6 md:px-12 mb-12 md:mb-16 pt-10">
        <div className="text-center max-w-3xl mx-auto mb-20 menu-header">
          <p className="text-primary uppercase tracking-[0.4em] text-[10px] mb-6 font-bold">
            Sourced with Precision
          </p>
          <h1 className="text-5xl md:text-8xl font-serif mb-8 md:mb-12 italic">
            The Menu
          </h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text" 
              placeholder="Search our signature dishes..." 
              className="w-full bg-white/5 border border-white/10 px-16 py-4 text-xs italic focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-white/20 uppercase tracking-widest"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10 mb-12 md:mb-24">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold transition-all duration-300 pb-1 md:pb-2 border-b-2 whitespace-nowrap",
                activeCategory === cat 
                  ? "text-primary border-primary" 
                  : "text-white/30 border-transparent hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuCardItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink/40 font-light text-xl">No dishes found matching your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function MenuCardItem({ item }: { item: MenuItem; key?: React.Key }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="group menu-item-reveal"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-sm mb-6 relative luxury-border">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <button 
            onClick={handleAdd}
            className={cn(
              "p-4 rounded-full transition-all duration-300",
              added ? "bg-primary text-bg-dark" : "bg-white text-bg-dark hover:bg-primary hover:text-white"
            )}
          >
            {added ? <Check size={20} /> : <ShoppingCart size={20} />}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-baseline mb-3">
        <h3 className="text-2xl font-serif italic text-white">{item.name}</h3>
        <span className="text-primary font-serif italic text-xl">${item.price}</span>
      </div>
      <p className="text-white/60 text-[11px] leading-relaxed uppercase tracking-widest mb-6 h-12 overflow-hidden">
        {item.description}
      </p>
      <div className="flex flex-wrap gap-3">
        {item.tags.map(tag => (
          <span key={tag} className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary/40 border border-primary/20 px-3 py-1">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
