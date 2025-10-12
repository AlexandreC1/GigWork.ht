
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
}

export interface Review {
  id: string;
  reviewerId: string;
  rating: number;
  comment: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface AuthContextType {
  user: User | null;
  login: (name: string, role: UserRole) => void;
  logout: () => void;
}
