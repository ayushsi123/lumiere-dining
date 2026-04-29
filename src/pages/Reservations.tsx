import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

export default function Reservations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.res-title > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });
      
      gsap.from('.res-card', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power4.out'
      });
    }, containerRef.current!);
    return () => ctx.revert();
  }, []);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Success state
  };

  return (
    <div ref={containerRef} className="pt-32 md:pt-40 pb-20 bg-bg-dark min-h-screen text-white">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl pt-6 md:pt-10">
        <div className="text-center mb-16 res-title">
          <p className="text-primary uppercase tracking-[0.3em] text-[10px] mb-6 font-bold">
            Reserved For You
          </p>
          <h1 className="text-4xl md:text-7xl font-serif mb-6 italic">
            Make a Reservation
          </h1>
          <p className="text-white/40 font-light text-sm uppercase tracking-widest">Join us for an evening of culinary excellence. Tables are held for 15 minutes.</p>
        </div>

        <div className="bg-bg-card rounded-sm shadow-2xl border border-white/5 overflow-hidden res-card">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 md:p-12 text-white"
              >
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  <div className="space-y-4">
                    <label className="flex items-center text-[10px] uppercase tracking-widest text-white/30 font-bold">
                      <Calendar size={14} className="mr-2 text-primary" /> Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-primary text-sm italic text-white"
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center text-[10px] uppercase tracking-widest text-white/30 font-bold">
                      <Users size={14} className="mr-2 text-primary" /> Guests
                    </label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-primary text-sm font-light text-white appearance-none"
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n} className="bg-bg-card">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center text-[10px] uppercase tracking-widest text-white/30 font-bold">
                      <Clock size={14} className="mr-2 text-primary" /> Time
                    </label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-primary text-sm font-light text-white appearance-none"
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    >
                      {['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'].map(t => (
                        <option key={t} value={t} className="bg-bg-card">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button 
                  onClick={() => setStep(2)}
                  className="w-full luxury-button"
                >
                  Continue to Details
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.form
                key="step2"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 md:p-12 space-y-6 md:space-y-8 text-white"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Enter your name" 
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-primary text-sm italic text-white placeholder:text-white/10"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="your@email.com" 
                      className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-primary text-sm italic text-white placeholder:text-white/40"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Special Notes (Optional)</label>
                  <textarea 
                    rows={3} 
                    placeholder="Allergies, special occasions..." 
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-primary text-sm italic text-white placeholder:text-white/40"
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 outline-button"
                  >
                    Go Back
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] luxury-button"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 md:p-20 text-center space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20">
                    <CheckCircle2 size={48} />
                  </div>
                </div>
                <h2 className="text-4xl font-serif italic">Table Confirmed!</h2>
                <div className="text-white/40 font-light space-y-2 text-sm uppercase tracking-widest">
                  <p>Thank you, {formData.name}. We've sent a confirmation to {formData.email}.</p>
                  <p className="font-bold text-primary italic mt-4">{formData.date} at {formData.time} for {formData.guests} Guests</p>
                </div>
                <button 
                  onClick={() => setStep(1)}
                  className="mt-10 luxury-button inline-block"
                >
                  Make Another Booking
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info */}
        <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-12 md:gap-16 text-white/30 text-[10px] items-start uppercase tracking-[0.2em] font-bold">
          <div className="space-y-6">
            <h4 className="text-primary font-serif text-lg italic tracking-widest lowercase border-b border-white/5 pb-2">Cancellation Policy</h4>
            <p className="leading-relaxed">We understand plans change. Please cancel at least 12 hours in advance. No-shows may be subject to a fee of $25 per person for weekend bookings.</p>
          </div>
          <div className="space-y-6">
            <h4 className="text-primary font-serif text-lg italic tracking-widest lowercase border-b border-white/5 pb-2">Special Events</h4>
            <p className="leading-relaxed">For parties larger than 8 or private events, please contact our events team at events@lumieredining.com or call us directly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
