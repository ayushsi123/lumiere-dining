import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.hero-content > *', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: 'power4.out',
      });

      // 3D Scroll Reveal Animations
      gsap.utils.toArray('.reveal').forEach((elem: any) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      });

      // Gallery Images reveal
      gsap.utils.toArray('.gallery-item').forEach((item: any) => {
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

      // Special Image Parallax
      gsap.to('.parallax-img', {
        scrollTrigger: {
          trigger: '.parallax-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: -150,
        scale: 1.1,
        ease: 'none',
      });
    }, containerRef.current!);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden bg-bg-dark pt-24 md:pt-32">
      {/* Refined Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col lg:grid lg:grid-cols-12 border-b border-white/10">
        {/* Left Branding Column */}
        <div className="lg:col-span-5 px-6 py-16 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 hero-content">
          <span className="text-primary uppercase tracking-[0.4em] text-[10px] mb-6 font-semibold">
            EST. 1994 • Manhattan, NY
          </span>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif leading-[0.9] mb-8 italic">
            Culinary<br/>Artistry<br/>
            <span className="not-italic text-primary">Refined.</span>
          </h1>

          <p className="max-w-xs text-white/60 text-sm mb-12 leading-relaxed">
            Experience an avant-garde approach to American heritage cuisine, where every plate tells a story of seasonal precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/menu" className="luxury-button text-center">
              View Full Menu
            </Link>
            <Link to="/order" className="outline-button text-center">
              Order Online
            </Link>
          </div>
        </div>

        {/* Right Gallery Column */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            <div className="relative group overflow-hidden bg-bg-card gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=800&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70"
                alt="Wagyu Ribeye"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                <p className="text-[10px] text-primary uppercase tracking-[0.3em] mb-2 font-bold italic">Signature Item</p>
                <h3 className="text-2xl md:text-3xl font-serif italic text-white">Wild Atlantic Halibut</h3>
              </div>
            </div>
            <div className="relative group overflow-hidden bg-bg-card border-l border-white/5 gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                alt="Interior"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                <p className="text-[10px] text-primary uppercase tracking-[0.3em] mb-2 font-bold italic">Atmosphere</p>
                <h3 className="text-2xl md:text-3xl font-serif italic text-white">The Obsidian Lounge</h3>
              </div>
            </div>
          </div>
          
          {/* Active Status Widget Placeholder */}
          <div className="h-1/3 bg-bg-widget p-10 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/10">
            <div className="flex items-center space-x-6">
              <div className="h-16 w-16 border border-primary flex items-center justify-center rounded-full">
                <div className="h-3 w-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>
              </div>
              <div className="text-left">
                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-2 font-bold">Kitchen Status</p>
                <p className="text-sm font-medium text-white">Chef is <span className="text-primary italic">plating your experience</span></p>
                <p className="text-[10px] text-white/20 mt-1">Est. Table Arrival: 8:45 PM</p>
              </div>
            </div>
            <div className="flex space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={cn(
                  "w-12 h-1 transition-all duration-700",
                  i <= 3 ? "bg-primary shadow-[0_0_10px_rgba(212,175,55,0.4)]" : "bg-white/10"
                )}></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Philosophy Section Refined */}
      <section className="py-20 md:py-40 bg-bg-dark">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="relative parallax-container">
              <div className="aspect-[4/5] overflow-hidden rounded-sm">
                <img 
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop" 
                  className="w-full h-full object-cover parallax-img"
                  alt="Fine Dining"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-bg-dark text-white p-8 md:p-12 hidden sm:block reveal">
                <Star className="text-primary mb-4" fill="currentColor" />
                <h3 className="text-xl md:text-2xl font-serif mb-2">Michelin Star Quality</h3>
                <p className="text-white/60 font-light text-xs md:text-sm">Recognized for our commitment to exceptional culinary standards.</p>
              </div>
            </div>
            
            <div className="space-y-8 reveal">
              <span className="text-primary uppercase tracking-widest text-xs md:text-sm font-semibold">Our Story</span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">The Art of<br /> Culinary Perfection</h2>
              <p className="text-lg text-white/70 leading-relaxed font-light">
                Founded on the principles of sustainability and craftsmanship, Lumière brings together seasonal ingredients and avant-garde techniques. We believe that dining should be an immersive sensory experience that stays with you long after the final course.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h4 className="text-3xl font-serif text-primary">12+</h4>
                  <p className="text-sm text-white/30 uppercase tracking-widest mt-1">Years of Excellence</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-primary">100%</h4>
                  <p className="text-sm text-white/30 uppercase tracking-widest mt-1">Organic Sourcing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items / Marquee feel */}
      <section className="bg-bg-dark py-32 overflow-hidden">
        <div className="container mx-auto px-6 mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-4xl md:text-5xl text-white font-serif">Seasonal<br className="hidden md:block" /> Masterpieces</h2>
            <Link to="/menu" className="text-primary uppercase tracking-[0.2em] text-sm hover:translate-x-2 transition-transform flex items-center">
              Explore Full Menu <ChevronRight size={16} />
            </Link>
          </div>
        </div>
        
        {/* Horizontal Scroll Area */}
        <div className="flex space-x-8 px-6 overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[300px] md:min-w-[450px] group snap-start">
              <div className="aspect-[4/5] overflow-hidden mb-6">
                <img 
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1546241072-48010ad28c2c' : i === 2 ? '1599487488170-d11ec9c173f0' : i === 3 ? '1533682805518-48d1f5b8cd3a' : '1551024506-0bccd828d307'}?q=80&w=800&auto=format&fit=crop`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={`Dish ${i}`}
                />
              </div>
              <h3 className="text-white text-2xl font-serif mb-2">Signature Dish Collection</h3>
              <p className="text-primary font-serif">Starting from $28</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="py-16 md:py-20 border-y border-white/5 reveal">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl">Visit Us</h4>
                <p className="text-white/40 font-light">123 Culinary Ave, NYC</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl">Opening Hours</h4>
                <p className="text-white/40 font-light">Tue - Sun, 5pm - 11pm</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Star size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl">Reservations</h4>
                <p className="text-white/40 font-light">Highly Recommended</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
