export type City =
  | "Toronto"
  | "Brampton"
  | "Mississauga"
  | "Vaughan"
  | "Markham"
  | "Scarborough";

export type SportSlug =
  | "cricket"
  | "badminton"
  | "basketball"
  | "volleyball"
  | "soccer"
  | "tennis"
  | "pickleball"
  | "table-tennis"
  | "ice-hockey"
  | "fitness"
  | "swimming";

export interface Sport {
  slug: SportSlug;
  name: string;
  tagline: string;
  emoji: string;
  accent: string;       // tailwind-friendly hex (used for gradients)
  description: string;
  hero: string;         // image URL
  trending?: boolean;
}

export type Surface =
  | "Turf"
  | "Hardwood"
  | "Clay"
  | "Concrete"
  | "Ice"
  | "Sand"
  | "Pool"
  | "Synthetic"
  | "Grass";

export interface Slot {
  id: string;
  hour: number;
  duration: number; // hours
  price: number;    // CAD per hour
  available: boolean;
  hot?: boolean;
}

export interface Review {
  id: string;
  user: string;
  avatarColor: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Venue {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  city: City;
  address: string;
  neighbourhood: string;
  lat: number;
  lng: number;
  sports: SportSlug[];
  primarySport: SportSlug;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  surface: Surface;
  indoor: boolean;
  kidsFriendly: boolean;
  parking: boolean;
  coaching: boolean;
  foodCourt: boolean;
  washrooms: boolean;
  amenities: string[];
  rules: string[];
  cancellationPolicy: string;
  images: string[];
  owner: { name: string; since: number; verified: boolean };
  slots: Slot[];
  reviews: Review[];
  occupancy: number; // 0–100, "live" feel
  tags: string[];
  featured?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  category: "Tournament" | "Open Play" | "Clinic" | "Match" | "News";
  sport: SportSlug;
  city: City;
  date: string;
  image: string;
  excerpt: string;
  pill?: string;
}

export interface Booking {
  id: string;
  venueId: string;
  venueName: string;
  city: City;
  sport: SportSlug;
  date: string;       // ISO date
  startHour: number;
  duration: number;
  adults: number;
  kids: number;
  total: number;
  createdAt: string;
}
