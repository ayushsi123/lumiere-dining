import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCart();
  const location = useLocation();

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Order Online', path: '/order' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-[1000] transition-all duration-500 py-8 border-b border-white/10',
        isScrolled ? 'bg-bg-dark/95 backdrop-blur-md py-6' : 'bg-transparent text-white'
      )}
    >
      <div className="container mx-auto px-10 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-serif tracking-[0.2em] uppercase text-primary"
          id="nav-logo"
        >
          Lumière
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-[10px] uppercase tracking-[0.3em] font-medium transition-colors relative group',
                location.pathname === link.path ? 'text-primary' : 'text-white/70 hover:text-primary'
              )}
            >
              {link.name}
              <span className={cn(
                'absolute -bottom-2 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full',
                location.pathname === link.path ? 'w-full' : ''
              )} />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-8">
          <Link to="/reservations" className="hidden xl:block gold-outline-button">
            Book a Table
          </Link>
          <Link to="/order" className="hover:text-primary transition-colors relative">
            <ShoppingBag size={18} />
            <AnimatePresence>
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-primary text-bg-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 top-[70px] bg-bg-dark text-white z-40 flex flex-col items-center justify-center space-y-8 p-6"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={cn(
                    'text-2xl font-serif uppercase tracking-widest hover:text-primary transition-colors',
                    location.pathname === link.path ? 'text-primary' : ''
                  )}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

