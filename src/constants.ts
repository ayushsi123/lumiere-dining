import { MenuItem, GalleryImage } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Scallops',
    description: 'Hokkaido scallops, black truffle, cauliflower purée, micro greens.',
    price: 28,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c173f0?q=80&w=800&auto=format&fit=crop',
    tags: ['Signature', 'Seafood']
  },
  {
    id: '2',
    name: 'Wagyu Ribeye',
    description: 'A5 Miyazaki Wagyu, roasted bone marrow, red wine jus, asparagus.',
    price: 85,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=800&auto=format&fit=crop',
    tags: ['Premium', 'Meat']
  },
  {
    id: '3',
    name: 'Lobster Thermidor',
    description: 'Maine lobster, cognac cream sauce, gruyère, herb crust.',
    price: 64,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cd3a?q=80&w=800&auto=format&fit=crop',
    tags: ['Seafood']
  },
  {
    id: '4',
    name: 'Heritage Beet Salad',
    description: 'Roasted beets, whipped goat cheese, candied walnuts, citrus vinaigrette.',
    price: 18,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    tags: ['Vegan-Option']
  },
  {
    id: '5',
    name: 'Gold Leaf Chocolate Dome',
    description: '70% Valrhona chocolate, raspberry coulis, 24k gold leaf.',
    price: 22,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop',
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
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop', alt: 'Cocktail', category: 'Food' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop', alt: 'Restaurant Interior', category: 'Ambiance' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop', alt: 'Fine Dining Set', category: 'Ambiance' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop', alt: 'Plated Meat', category: 'Food' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1550966841-3ee4ad6b1074?q=80&w=1200&auto=format&fit=crop', alt: 'Chef Cooking', category: 'Service' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop', alt: 'Plated Appetizer', category: 'Food' },
];
