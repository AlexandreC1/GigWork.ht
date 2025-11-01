import { GIGS, USERS, REVIEWS } from '../constants';
import { Gig, User, Review, UserRole } from '../types';

const LATENCY = 500; // ms

// A helper to simulate network latency
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  async login(name: string, role: UserRole): Promise<User> {
    await sleep(LATENCY);
    
    // In a real app, this would be a POST request to /api/login
    console.log(`Simulating login for name: ${name}, role: ${role}`);
    let foundUser = USERS.find(u => u.name.toLowerCase() === name.toLowerCase() && u.role === role);
    
    if (!foundUser) {
       foundUser = {
           id: `user-${Date.now()}`,
           name: name,
           role: role,
           avatar: `https://picsum.photos/seed/${name}/200/200`,
           rating: 0,
           reviewsCount: 0,
           skills: role === UserRole.Worker ? ['New Skill 1', 'New Skill 2'] : undefined,
           moncashId: role === UserRole.Worker ? '509-zz-zzzz' : undefined,
           availabilities: role === UserRole.Worker ? 'Mon - Fri, 9am - 5pm' : undefined,
           portfolioImages: role === UserRole.Worker ? ['https://picsum.photos/seed/newwork1/400/300'] : undefined,
           favorites: [],
       };
       // In a real backend, you'd save this new user. We'll add them to our mock data for session consistency.
       USERS.push(foundUser); 
    }
    return foundUser;
  },

  async fetchGigs(): Promise<Gig[]> {
    await sleep(LATENCY);
     // In a real app, this would be a GET request to /api/gigs
    console.log('Simulating fetching all gigs with worker data');
    return GIGS.map(gig => ({
      ...gig,
      worker: USERS.find(u => u.id === gig.workerId)
    }));
  },

  async fetchGigById(id: string): Promise<Gig | undefined> {
    await sleep(LATENCY);
    // In a real app, this would be a GET request to /api/gigs/${id}
    console.log(`Simulating fetching gig with id: ${id}`);
    return GIGS.find(g => g.id === id);
  },

  async fetchGigsByIds(ids: string[]): Promise<Gig[]> {
    await sleep(LATENCY);
    console.log('Simulating fetching gigs by IDs:', ids);
    const gigs = GIGS.filter(gig => ids.includes(gig.id)).map(gig => ({
      ...gig,
      worker: USERS.find(u => u.id === gig.workerId)
    }));
    return gigs;
  },

  async fetchUserById(id: string): Promise<User | undefined> {
    await sleep(LATENCY);
    // In a real app, this would be a GET request to /api/users/${id}
    console.log(`Simulating fetching user with id: ${id}`);
    return USERS.find(u => u.id === id);
  },

  async updateUser(userId: string, updatedData: Partial<User>): Promise<User> {
    await sleep(LATENCY);
    console.log(`Simulating updating user ${userId}`, updatedData);
    const userIndex = USERS.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    USERS[userIndex] = { ...USERS[userIndex], ...updatedData };
    return USERS[userIndex];
  },

  async fetchReviewsByGigId(gigId: string): Promise<Review[]> {
    await sleep(LATENCY);
    // In a real app, this would be a GET request to /api/gigs/${gigId}/reviews
    console.log(`Simulating fetching reviews for gig id: ${gigId}`);
    return REVIEWS.filter(r => r.gigId === gigId);
  },

  async fetchSimilarGigs(currentGigId: string, category: string): Promise<Gig[]> {
    await sleep(LATENCY);
    console.log(`Simulating fetching similar gigs for category: ${category}`);
    return GIGS.filter(g => g.id !== currentGigId && g.category === category)
      .slice(0, 3) // Return up to 3 similar gigs
      .map(gig => ({
        ...gig,
        worker: USERS.find(u => u.id === gig.workerId)
      }));
  },

  async postMessage(gigId: string, text: string): Promise<{ id: string, sender: string, text: string }> {
      await sleep(LATENCY / 2);
      // In a real app, this would be a POST request to /api/gigs/${gigId}/messages
      console.log(`Simulating posting message for gig ${gigId}: ${text}`);
      return { id: Date.now().toString(), sender: 'user', text };
  },
  
  async getBotResponse(userMessage: string): Promise<{ id: string, sender: string, text: string }> {
    await sleep(LATENCY * 2);
    // This simulates the worker/bot replying
    console.log('Simulating bot response');
    return { id: Date.now().toString(), sender: 'worker', text: 'Thank you for your message. I will be with you shortly.' };
  },

  async processPayment(gigId: string): Promise<{ success: boolean }> {
      await sleep(LATENCY * 4);
      // In a real app, this would be a POST request to /api/gigs/${gigId}/payment
      console.log(`Simulating payment for gig ${gigId}`);
      const success = Math.random() > 0.2;
      return { success };
  },

  async addGig(gigData: Omit<Gig, 'id' | 'workerId'>, workerId: string): Promise<Gig> {
    await sleep(LATENCY);
    const newGig: Gig = {
      ...gigData,
      id: `gig-${Date.now()}`,
      workerId: workerId,
    };
    GIGS.unshift(newGig); // Add to the beginning of the list
    console.log('Simulating adding a new gig:', newGig);
    return newGig;
  },

  async addReview(gigId: string, reviewData: { rating: number; comment: string; imageUrl?: string; }, reviewerId: string): Promise<Review> {
    await sleep(LATENCY);
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      gigId: gigId,
      reviewerId: reviewerId,
    };
    REVIEWS.push(newReview);
    console.log('Simulating adding a new review:', newReview);
    return newReview;
  },
  
  async deleteGig(gigId: string): Promise<void> {
    await sleep(LATENCY);
    console.log(`Simulating deleting gig with id: ${gigId}`);
    const index = GIGS.findIndex(g => g.id === gigId);
    if (index > -1) {
      GIGS.splice(index, 1);
    } else {
      console.warn(`Gig with id ${gigId} not found for deletion.`);
    }
  },

  async fetchUserFavorites(userId: string): Promise<string[]> {
    await sleep(LATENCY / 2);
    console.log(`Simulating fetching favorites for user ${userId}`);
    const user = USERS.find(u => u.id === userId);
    return user?.favorites || [];
  },

  async addFavorite(userId: string, gigId: string): Promise<boolean> {
    await sleep(LATENCY / 2);
    console.log(`Simulating user ${userId} adding favorite ${gigId}`);
    const user = USERS.find(u => u.id === userId);
    if (user && !user.favorites?.includes(gigId)) {
      user.favorites = [...(user.favorites || []), gigId];
    }
    return true;
  },

  async removeFavorite(userId: string, gigId: string): Promise<boolean> {
    await sleep(LATENCY / 2);
    console.log(`Simulating user ${userId} removing favorite ${gigId}`);
    const user = USERS.find(u => u.id === userId);
    if (user && user.favorites?.includes(gigId)) {
      user.favorites = user.favorites.filter(id => id !== gigId);
    }
    return true;
  },
};