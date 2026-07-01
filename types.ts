export enum UserRole {
  Customer = 'CUSTOMER',
  Worker = 'WORKER',
  Admin = 'ADMIN',
}

export type Permission =
  | 'gig:create'
  | 'gig:update-own'
  | 'gig:delete-own'
  | 'booking:create'
  | 'booking:manage-own'
  | 'stats:view-own'
  | 'stats:view-platform'
  | 'security:view';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  rating: number;
  reviewsCount: number;
  verified?: boolean;
  phone?: string;
  city?: string;
  joinedAt?: string;
  permissions?: Permission[];
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
  currency?: 'USD' | 'HTG';
  description: string;
  eta: string;
  distance: string;
  city?: string;
  image: string;
  tags?: string[];
  completedJobs?: number;
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
  senderId?: string;
  sender?: string;
  text: string;
  timestamp?: string;
}

export interface Booking {
  id: string;
  gigId: string;
  customerId: string;
  workerId: string;
  status: 'requested' | 'accepted' | 'paid' | 'completed' | 'disputed';
  total: number;
  createdAt: string;
}

export interface PlatformStats {
  activeGigs: number;
  verifiedWorkers: number;
  completedBookings: number;
  disputeRate: number;
  averageResponseMinutes: number;
  monthlyVolume: number;
}

export interface SecurityEvent {
  id: string;
  severity: 'low' | 'medium' | 'high';
  title: string;
  detail: string;
  status: 'monitored' | 'blocked' | 'resolved';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasPermission: (permission: Permission) => boolean;
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
