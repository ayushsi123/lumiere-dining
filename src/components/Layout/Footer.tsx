import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-footer text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif tracking-[0.3em] uppercase text-primary">Lumière</h2>
            <p className="text-white/30 text-[11px] leading-relaxed font-medium uppercase tracking-widest">
              Est. 1994 • Manhattan, NY
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/40 hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white/40 hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white/40 hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Discover</h3>
            <ul className="space-y-4">
              <li><Link to="/menu" className="text-xs uppercase tracking-widest hover:text-primary transition-colors font-semibold">The Menu</Link></li>
              <li><Link to="/reservations" className="text-xs uppercase tracking-widest hover:text-primary transition-colors font-semibold">Reservations</Link></li>
              <li><Link to="/gallery" className="text-xs uppercase tracking-widest hover:text-primary transition-colors font-semibold">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Inquiries</h3>
            <ul className="space-y-6">
              <li className="flex flex-col space-y-1">
                <span className="text-[9px] uppercase text-white/30 tracking-widest">Location</span>
                <span className="text-[10px] uppercase font-bold tracking-wider">452 Park Ave, New York</span>
              </li>
              <li className="flex flex-col space-y-1">
                <span className="text-[9px] uppercase text-white/30 tracking-widest">General</span>
                <span className="text-[10px] uppercase font-bold tracking-wider">hello@lumieredining.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Recognition</h3>
            <div className="flex flex-col space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold italic">Michelin Guide 2024</span>
              <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium">Top 50 Restaurants US</span>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/20 text-[9px] uppercase tracking-[0.2em] font-bold">
          <p>© {new Date().getFullYear()} Lumière Dining. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
