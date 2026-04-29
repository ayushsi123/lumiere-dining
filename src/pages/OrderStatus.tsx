import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Package, CheckCircle2, Clock, Truck, ChefHat, MapPin } from 'lucide-react';
import { OrderStatus as Status } from '../types';
import gsap from 'gsap';

export default function OrderStatus() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const [status, setStatus] = useState<Status>('Confirmed');
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.status-card', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.8)'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Simulate order status updates
  useEffect(() => {
    const sequence: { status: Status; progress: number; delay: number }[] = [
      { status: 'Preparing', progress: 50, delay: 5000 },
      { status: 'Out for Delivery', progress: 75, delay: 10000 },
      { status: 'Delivered', progress: 100, delay: 15000 },
    ];

    const timeouts = sequence.map((step) => {
      return setTimeout(() => {
        setStatus(step.status);
        setProgress(step.progress);
      }, step.delay);
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, []);

  const steps = [
    { label: 'Confirmed', icon: CheckCircle2, thr: 25 },
    { label: 'Preparing', icon: ChefHat, thr: 50 },
    { label: 'On the Way', icon: Truck, thr: 75 },
    { label: 'Delivered', icon: Package, thr: 100 },
  ];

  return (
    <div ref={containerRef} className="pt-32 md:pt-40 pb-20 bg-bg-dark min-h-screen text-white">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl pt-6 md:pt-10">
        <div className="bg-bg-card rounded-sm shadow-2xl p-8 md:p-12 text-center border border-white/5 luxury-border status-card">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-12"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold mb-4">Order Tracking</p>
            <h1 className="text-3xl md:text-5xl font-serif mb-4 italic">#{id}</h1>
            <p className="text-primary font-serif italic text-xl">{status}</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="relative mb-20 pt-10">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2" />
            <motion.div 
              className="absolute top-1/2 left-0 h-px bg-primary -translate-y-1/2 origin-left shadow-[0_0_10px_rgba(212,175,55,0.5)]"
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ width: '100%', transformOrigin: 'left' }}
            />
            
            <div className="relative flex justify-between">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = progress >= step.thr;
                return (
                  <div key={i} className="flex flex-col items-center group">
                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all duration-700 z-10 ${
                      isActive 
                        ? 'bg-primary border-primary text-bg-dark shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                        : 'bg-bg-dark border-white/10 text-white/10'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <span className={`mt-6 text-[8px] md:text-[9px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold transition-all duration-500 italic ${
                      isActive ? 'text-primary' : 'text-white/10'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left border-y border-white/5 py-8 md:py-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white/20">
                <Clock size={16} />
                <span className="text-[9px] uppercase tracking-widest font-bold">Estimated Arrival</span>
              </div>
              <p className="text-xl font-serif italic">25 - 35 Minutes</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white/20">
                <MapPin size={16} />
                <span className="text-[9px] uppercase tracking-widest font-bold">Delivery Status</span>
              </div>
              <p className="text-xl font-serif italic text-primary">In the Kitchen</p>
            </div>
          </div>

          <p className="text-white/30 font-medium text-xs mb-12 leading-relaxed italic uppercase tracking-[0.1em]">
            Our expert chefs are currently preparing your masterpiece with the finest seasonal ingredients. You'll receive a notification once it's on the move.
          </p>

          <Link to="/" className="luxury-button inline-block px-12">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
