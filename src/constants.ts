import { MenuItem, GalleryImage } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Scallops',
    description: 'Hokkaido scallops, black truffle, cauliflower purée, micro greens.',
    price: 28,
    category: 'Appetizers',
    image: '/assets/scallops.png',
    tags: ['Signature', 'Seafood']
  },
  {
    id: '2',
    name: 'Wagyu Ribeye',
    description: 'A5 Miyazaki Wagyu, roasted bone marrow, red wine jus, asparagus.',
    price: 85,
    category: 'Main Course',
    image: '/assets/wagyu.png',
    tags: ['Premium', 'Meat']
  },
  {
    id: '3',
    name: 'Lobster Thermidor',
    description: 'Maine lobster, cognac cream sauce, gruyère, herb crust.',
    price: 64,
    category: 'Main Course',
    image: '/assets/lobster.png',
    tags: ['Seafood']
  },
  {
    id: '4',
    name: 'Heritage Beet Salad',
    description: 'Roasted beets, whipped goat cheese, candied walnuts, citrus vinaigrette.',
    price: 18,
    category: 'Appetizers',
    image: '/assets/beets.png',
    tags: ['Vegan-Option']
  },
  {
    id: '5',
    name: 'Gold Leaf Chocolate Dome',
    description: '70% Valrhona chocolate, raspberry coulis, 24k gold leaf.',
    price: 22,
    category: 'Desserts',
    image: '/assets/chocolate.png',
    tags: ['Signature']
  },
  {
    id: '6',
    name: 'Smoked Old Fashioned',
    description: 'Small batch bourbon, maple syrup, bitters, cedar smoke.',
    price: 20,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
    tags: ['Alcoholic']
  },
  {
    id: '7',
    name: 'Oyster Selection',
    description: 'Fresh Kumamoto oysters, mignonette, lemon, fresh horseradish.',
    price: 32,
    category: 'Appetizers',
    image: '/assets/oysters.png',
    tags: ['Seafood', 'Fresh']
  },
  {
    id: '8',
    name: 'Wild Mushroom Risotto',
    description: 'Acquerello rice, porcini, chanterelles, parmigiano reggiano, truffle oil.',
    price: 36,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800&auto=format&fit=crop',
    tags: ['Vegetarian', 'Classic']
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop', alt: 'Cocktail', category: 'Food' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop', alt: 'Restaurant Interior', category: 'Ambiance' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop', alt: 'Fine Dining Set', category: 'Ambiance' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop', alt: 'Plated Meat', category: 'Food' },
  { id: 'g5', url: '/assets/chef.png', alt: 'Chef Cooking', category: 'Service' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop', alt: 'Plated Appetizer', category: 'Food' },
  { id: 'g7', url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop', alt: 'Fine Dining Hall', category: 'Ambiance' },
  { id: 'g8', url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop', alt: 'Gourmet Dish', category: 'Food' },
  { id: 'g9', url: 'https://images.unsplash.com/photo-1554679665-f5537f187268?q=80&w=1200&auto=format&fit=crop', alt: 'Modern Bar', category: 'Ambiance' },
  { id: 'g10', url: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=1200&auto=format&fit=crop', alt: 'Service Staff', category: 'Service' },
  { id: 'g11', url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop', alt: 'Healthy Plating', category: 'Food' },
  { id: 'g12', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop', alt: 'Luxury Seating', category: 'Ambiance' },
];
