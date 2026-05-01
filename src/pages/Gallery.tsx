import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_IMAGES } from '../constants';
import { cn } from '../lib/utils';
import SEO from '../components/SEO';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Food', 'Ambiance', 'Service'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-title', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      });

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
    }, containerRef.current!);
    return () => ctx.revert();
  }, [filter]);

  const filteredImages = filter === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === filter);

  return (
    <div ref={containerRef} className="pt-32 md:pt-40 pb-20 bg-bg-dark min-h-screen text-white">
      <SEO 
        title="Visual Gallery" 
        description="A visual journey through Lumière Dining. Explore our culinary masterpieces, elegant ambiance, and impeccable service through our curated gallery."
      />
      {/* Hero Header */}
      <section className="relative pt-20 pb-32 mb-12 md:mb-20 overflow-hidden border-b border-white/5">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          alt="Gallery Header"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />
        <div className="container mx-auto px-10 md:px-12 relative z-10 text-center gallery-title">
          <p className="text-primary uppercase tracking-[0.4em] text-[10px] mb-6 font-bold">
            Visual Journey
          </p>
          <h1 className="text-5xl md:text-8xl font-serif mb-8 md:mb-12 italic">
            The Gallery
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-10 md:px-12">
        <div className="text-center mb-10 md:mb-20 pt-10">

          <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-10 md:mb-20">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold transition-all duration-300 pb-1 md:pb-2 border-b-2 whitespace-nowrap",
                  filter === cat ? "text-primary border-primary" : "text-white/20 border-transparent hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 px-1 bg-white/5">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <div
                key={img.id}
                className="relative aspect-square overflow-hidden group cursor-pointer bg-bg-card gallery-item"
                onClick={() => setSelectedImage(img.url)}
              >
                <img 
                  src={img.url} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-bg-dark/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-primary text-[10px] uppercase tracking-[0.3em] mb-2 font-bold italic">Enlarge</p>
                    <span className="text-white font-serif italic text-2xl">{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg-dark/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:text-primary">
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage} 
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
