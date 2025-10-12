
import { Gig, User, Review, UserRole } from './types';

export const USERS: User[] = [
  {
    id: 'user-1',
    name: 'Jean-Pierre',
    role: UserRole.Worker,
    avatar: 'https://picsum.photos/seed/user1/200/200',
    rating: 4.8,
    reviewsCount: 25,
    moncashId: '509-xx-xxxx',
    skills: ['Plumbing', 'Electrical Repair', 'Painting'],
    availabilities: 'Mon - Fri, 9am - 5pm',
    portfolioImages: [
      'https://picsum.photos/seed/work1/400/300',
      'https://picsum.photos/seed/work2/400/300',
      'https://picsum.photos/seed/work3/400/300',
    ]
  },
  {
    id: 'user-2',
    name: 'Marie-Claire',
    role: UserRole.Worker,
    avatar: 'https://picsum.photos/seed/user2/200/200',
    rating: 4.9,
    reviewsCount: 42,
    moncashId: '509-yy-yyyy',
    skills: ['House Cleaning', 'Cooking', 'Child Care'],
    availabilities: 'Weekends, 10am - 6pm',
     portfolioImages: [
      'https://picsum.photos/seed/work4/400/300',
      'https://picsum.photos/seed/work5/400/300',
    ]
  },
  {
    id: 'user-3',
    name: 'Samuel',
    role: UserRole.Customer,
    avatar: 'https://picsum.photos/seed/user3/200/200',
    rating: 0,
    reviewsCount: 0,
  }
];

export const GIGS: Gig[] = [
  {
    id: 'gig-1',
    workerId: 'user-1',
    title: 'Expert Plumbing Services',
    category: 'Home Repair',
    price: 50,
    description: 'Leaky faucet? Clogged drain? I provide fast and reliable plumbing solutions for all your household needs. With 10 years of experience, I guarantee quality work.',
    eta: '30 mins',
    distance: '2km away',
    image: 'https://picsum.photos/seed/gig1/400/300'
  },
  {
    id: 'gig-2',
    workerId: 'user-2',
    title: 'Professional House Cleaning',
    category: 'Cleaning',
    price: 75,
    description: 'Get your home sparkling clean! I offer thorough and efficient cleaning services, using eco-friendly products. Weekly, bi-weekly, or one-time services available.',
    eta: '45 mins',
    distance: '5km away',
    image: 'https://picsum.photos/seed/gig2/400/300'
  },
  {
    id: 'gig-3',
    workerId: 'user-1',
    title: 'Interior & Exterior Painting',
    category: 'Home Repair',
    price: 300,
    description: 'Transform your space with a fresh coat of paint. I handle everything from prep work to the final touch, ensuring a professional and long-lasting finish.',
    eta: '1 hour',
    distance: '2km away',
    image: 'https://picsum.photos/seed/gig3/400/300'
  },
   {
    id: 'gig-4',
    workerId: 'user-2',
    title: 'Authentic Haitian Cuisine Catering',
    category: 'Cooking',
    price: 150,
    description: 'Planning an event? Let me cater with delicious and authentic Haitian dishes that will impress your guests. Griot, Diri ak Djon Djon, and more!',
    eta: '1 day notice',
    distance: '5km away',
    image: 'https://picsum.photos/seed/gig4/400/300'
  }
];

export const REVIEWS: Review[] = [
    { id: 'rev-1', reviewerId: 'user-3', rating: 5, comment: 'Jean-Pierre fixed my sink in no time! Very professional and friendly. Highly recommend!'},
    { id: 'rev-2', reviewerId: 'user-4', rating: 4, comment: 'Good work, but was a little late. The final result was great though.'},
    { id: 'rev-3', reviewerId: 'user-5', rating: 5, comment: 'Absolutely amazing painter. My living room looks brand new.'},
];

export const CATEGORIES = ['All', 'Home Repair', 'Cleaning', 'Cooking', 'Child Care', 'Delivery', 'Tutoring'];
