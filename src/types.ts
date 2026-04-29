export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Appetizers' | 'Main Course' | 'Desserts' | 'Drinks';
  image: string;
  tags: string[];
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: 'Food' | 'Ambiance' | 'Service';
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  items: { menuItemId: string; quantity: number }[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  customerName: string;
  customerPhone: string;
}

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
}
