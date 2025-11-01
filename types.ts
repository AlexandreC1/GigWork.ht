export enum UserRole {
  Customer = 'CUSTOMER',
  Worker = 'WORKER',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  rating: number;
  reviewsCount: number;
  moncashId?: string;
  skills?: string[];
  portfolioImages?: string[];
  availabilities?: string;
  favorites?: string[];
}

export interface Gig {
  id: string;
  workerId: string;
  title: string;
  category: string;
  price: number;
  description: string;
  eta: string;
  distance: string;
  image: string;
  worker?: User;
}

export interface Review {
  id: string;
  gigId: string;
  reviewerId: string;
  rating: number;
  comment: string;
  imageUrl?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface AuthContextType {
  user: User | null;
  login: (name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

export interface FavoritesContextType {
  favoriteIds: string[];
  addFavorite: (gigId: string) => Promise<void>;
  removeFavorite: (gigId: string) => Promise<void>;
  isFavorite: (gigId: string) => boolean;
  isLoading: boolean;
}