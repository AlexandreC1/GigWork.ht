import { BOOKINGS, GIGS, PLATFORM_STATS, REVIEWS, SECURITY_EVENTS, USERS } from '../constants';
import { Booking, Gig, PlatformStats, Review, SecurityEvent, User, UserRole } from '../types';

const LATENCY = 220;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const attachWorker = (gig: Gig): Gig => ({
  ...gig,
  worker: USERS.find((user) => user.id === gig.workerId),
});

const avatarFor = (name: string) => `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=00209f,d21034,0f766e&fontFamily=Arial`;

export const apiService = {
  async login(name: string, role: UserRole): Promise<User> {
    await sleep(LATENCY);
    const normalizedName = name.trim() || 'Guest User';
    let foundUser = USERS.find((user) => user.name.toLowerCase() === normalizedName.toLowerCase() && user.role === role);

    if (!foundUser) {
      foundUser = {
        id: `user-${Date.now()}`,
        name: normalizedName,
        role,
        avatar: avatarFor(normalizedName),
        rating: role === UserRole.Worker ? 4.7 : 0,
        reviewsCount: role === UserRole.Worker ? 3 : 0,
        verified: role !== UserRole.Worker ? true : false,
        city: 'Port-au-Prince',
        joinedAt: new Date().toISOString(),
        skills: role === UserRole.Worker ? ['New service', 'Mobile ready'] : undefined,
        moncashId: role === UserRole.Worker ? 'pending-verification' : undefined,
        availabilities: role === UserRole.Worker ? 'Set availability in profile' : undefined,
        portfolioImages: role === UserRole.Worker ? ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80'] : undefined,
        favorites: [],
      };
      USERS.push(foundUser);
    }

    return foundUser;
  },

  async fetchGigs(): Promise<Gig[]> {
    await sleep(LATENCY);
    return GIGS.map(attachWorker);
  },

  async fetchGigById(id: string): Promise<Gig | undefined> {
    await sleep(LATENCY);
    const gig = GIGS.find((item) => item.id === id);
    return gig ? attachWorker(gig) : undefined;
  },

  async fetchGigsByIds(ids: string[]): Promise<Gig[]> {
    await sleep(LATENCY);
    return GIGS.filter((gig) => ids.includes(gig.id)).map(attachWorker);
  },

  async fetchUserById(id: string): Promise<User | undefined> {
    await sleep(LATENCY);
    return USERS.find((user) => user.id === id);
  },

  async updateUser(userId: string, updatedData: Partial<User>): Promise<User> {
    await sleep(LATENCY);
    const userIndex = USERS.findIndex((user) => user.id === userId);
    if (userIndex === -1) throw new Error('User not found');
    USERS[userIndex] = { ...USERS[userIndex], ...updatedData };
    return USERS[userIndex];
  },

  async fetchReviewsByGigId(gigId: string): Promise<Review[]> {
    await sleep(LATENCY);
    return REVIEWS.filter((review) => review.gigId === gigId);
  },

  async fetchSimilarGigs(currentGigId: string, category: string): Promise<Gig[]> {
    await sleep(LATENCY);
    return GIGS.filter((gig) => gig.id !== currentGigId && gig.category === category).slice(0, 3).map(attachWorker);
  },

  async fetchBookingsForUser(userId: string): Promise<Booking[]> {
    await sleep(LATENCY);
    return BOOKINGS.filter((booking) => booking.customerId === userId || booking.workerId === userId);
  },

  async fetchPlatformStats(): Promise<PlatformStats> {
    await sleep(LATENCY);
    return PLATFORM_STATS;
  },

  async fetchSecurityEvents(): Promise<SecurityEvent[]> {
    await sleep(LATENCY);
    return SECURITY_EVENTS;
  },

  async postMessage(gigId: string, text: string): Promise<{ id: string; sender: string; text: string }> {
    await sleep(LATENCY / 2);
    return { id: `${gigId}-${Date.now()}`, sender: 'user', text };
  },

  async getBotResponse(_userMessage?: string): Promise<{ id: string; sender: string; text: string }> {
    await sleep(LATENCY);
    return { id: Date.now().toString(), sender: 'worker', text: 'Thanks. I can confirm the time, price, and materials before you approve payment.' };
  },

  async processPayment(gigId: string): Promise<{ success: boolean }> {
    await sleep(LATENCY * 2);
    return { success: Boolean(gigId) };
  },

  async addGig(gigData: Omit<Gig, 'id' | 'workerId'>, workerId: string): Promise<Gig> {
    await sleep(LATENCY);
    const newGig: Gig = { ...gigData, id: `gig-${Date.now()}`, workerId, completedJobs: 0 };
    GIGS.unshift(newGig);
    return attachWorker(newGig);
  },

  async addReview(gigId: string, reviewData: { rating: number; comment: string; imageUrl?: string }, reviewerId: string): Promise<Review> {
    await sleep(LATENCY);
    const newReview: Review = { ...reviewData, id: `rev-${Date.now()}`, gigId, reviewerId };
    REVIEWS.push(newReview);
    return newReview;
  },

  async deleteGig(gigId: string): Promise<void> {
    await sleep(LATENCY);
    const index = GIGS.findIndex((gig) => gig.id === gigId);
    if (index > -1) GIGS.splice(index, 1);
  },

  async fetchUserFavorites(userId: string): Promise<string[]> {
    await sleep(LATENCY / 2);
    return USERS.find((user) => user.id === userId)?.favorites || [];
  },

  async addFavorite(userId: string, gigId: string): Promise<boolean> {
    await sleep(LATENCY / 2);
    const user = USERS.find((item) => item.id === userId);
    if (user && !user.favorites?.includes(gigId)) user.favorites = [...(user.favorites || []), gigId];
    return true;
  },

  async removeFavorite(userId: string, gigId: string): Promise<boolean> {
    await sleep(LATENCY / 2);
    const user = USERS.find((item) => item.id === userId);
    if (user?.favorites?.includes(gigId)) user.favorites = user.favorites.filter((id) => id !== gigId);
    return true;
  },
};
