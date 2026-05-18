import type { Slot, Venue } from "@/lib/types";

/** Deterministic slot generator so SSR & client match. */
function buildSlots(seed: number, basePrice: number): Slot[] {
  const slots: Slot[] = [];
  for (let h = 7; h <= 22; h++) {
    const variance = ((seed * (h + 3)) % 7) - 3; // -3..+3
    const price = Math.max(8, basePrice + variance);
    // Pseudo random availability — but stable for SSR
    const available = ((seed + h) * 9301 + 49297) % 233280;
    const avail = available / 233280 > 0.32;
    const hot = avail && h >= 18 && h <= 21;
    slots.push({
      id: `${seed}-${h}`,
      hour: h,
      duration: 1,
      price,
      available: avail,
      hot,
    });
  }
  return slots;
}

const REVIEW_AUTHORS = [
  ["Arjun S.", "#0a84ff"], ["Priya K.", "#ff3da6"], ["Daniel C.", "#19e168"],
  ["Mia R.", "#ffb547"], ["Liam T.", "#7cc3ff"], ["Aisha N.", "#5cf09a"],
  ["Noah W.", "#0a84ff"], ["Sofia M.", "#ff3da6"], ["Vikram P.", "#19e168"],
  ["Hana L.", "#ffb547"], ["Ethan G.", "#7cc3ff"], ["Zara H.", "#5cf09a"],
];

function buildReviews(seed: number) {
  const samples = [
    "Booking was buttery smooth. Lights, nets, everything pro grade.",
    "Easily the best turf in the GTA — clean washrooms, plenty of parking.",
    "Staff is incredible. Coaches actually know what they're talking about.",
    "Came for a friendly, stayed for the vibe. Will be back every weekend.",
    "Slots were exactly as shown. Receipt + QR check-in was slick.",
    "Cleaner than my house. The lounge area is a huge plus.",
  ];
  return Array.from({ length: 4 }).map((_, i) => {
    const [user, color] = REVIEW_AUTHORS[(seed + i * 3) % REVIEW_AUTHORS.length];
    return {
      id: `${seed}-r-${i}`,
      user,
      avatarColor: color,
      rating: 4 + ((seed + i) % 2) * 1,
      date: new Date(2026, 3 + ((seed + i) % 2), 4 + ((seed * i) % 22) + 1).toISOString(),
      comment: samples[(seed + i) % samples.length],
    };
  });
}

const IMG = {
  cricket: [
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1607734834519-d8576ae60ea4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=1600&q=80",
  ],
  badminton: [
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1521587765099-8835e7201186?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1613918431703-aa50889e3be8?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1600&q=80",
  ],
  basketball: [
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?auto=format&fit=crop&w=1600&q=80",
  ],
  soccer: [
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1486286701208-1d58e9338013?auto=format&fit=crop&w=1600&q=80",
  ],
  volleyball: [
    "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1600&q=80",
  ],
  tennis: [
    "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1531315396756-905d68d21b56?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1545809074-59472b3f5ecc?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1526232636376-934aebd1d2b9?auto=format&fit=crop&w=1600&q=80",
  ],
  pickleball: [
    "https://images.unsplash.com/photo-1687204209659-3bded6aecd79?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1632186065108-2c00d75d0d99?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1687204209659-3bded6aecd79?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1600&q=80",
  ],
  "table-tennis": [
    "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1591491653056-4e0f86ec9fe7?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1591491653056-4e0f86ec9fe7?auto=format&fit=crop&w=1600&q=80",
  ],
  "ice-hockey": [
    "https://images.unsplash.com/photo-1515703407324-5f51c2c3a6b9?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1580692475446-c2fabbbc8c54?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1515703407324-5f51c2c3a6b9?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1580692475446-c2fabbbc8c54?auto=format&fit=crop&w=1600&q=80",
  ],
  fitness: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1600&q=80",
  ],
  swimming: [
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=80",
  ],
};

type Raw = Omit<
  Venue,
  "slots" | "reviews" | "images" | "owner" | "occupancy" | "tags" | "id" | "slug" |
  "amenities" | "rules" | "cancellationPolicy" | "washrooms"
> & {
  amenities?: string[];
  rules?: string[];
  tags?: string[];
  featured?: boolean;
  occupancy?: number;
};

const RAW: Raw[] = [
  // ── CRICKET ────────────────────────────────────────────────────────────────
  {
    name: "Brampton Box Cricket Arena",
    tagline: "Floodlit indoor turf · 6-a-side",
    city: "Brampton", neighbourhood: "Bramalea",
    address: "120 Steeles Ave E, Brampton, ON L6T 1A1",
    lat: 43.7100, lng: -79.7240,
    sports: ["cricket"], primarySport: "cricket",
    pricePerHour: 45, rating: 4.9, reviewCount: 312,
    surface: "Turf", indoor: true,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: true,
    featured: true,
  },
  {
    name: "Mississauga Cricket Grounds",
    tagline: "Full ground · Hard & turf wickets",
    city: "Mississauga", neighbourhood: "Meadowvale",
    address: "6750 Meadowvale Town Centre Cir",
    lat: 43.5950, lng: -79.7480,
    sports: ["cricket"], primarySport: "cricket",
    pricePerHour: 60, rating: 4.7, reviewCount: 188,
    surface: "Grass", indoor: false,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: false,
  },
  {
    name: "Markham Premier Cricket Dome",
    tagline: "Year-round dome · Bowling machines",
    city: "Markham", neighbourhood: "Unionville",
    address: "8350 Kennedy Rd, Markham, ON L3R 2V6",
    lat: 43.8650, lng: -79.3260,
    sports: ["cricket"], primarySport: "cricket",
    pricePerHour: 55, rating: 4.8, reviewCount: 246,
    surface: "Turf", indoor: true,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: true,
    featured: true,
  },

  // ── BADMINTON ──────────────────────────────────────────────────────────────
  {
    name: "Smash Factory Mississauga",
    tagline: "12 wood-sprung courts · BWF lights",
    city: "Mississauga", neighbourhood: "Heartland",
    address: "5985 McLaughlin Rd, Mississauga, ON L5R 1B8",
    lat: 43.6020, lng: -79.6900,
    sports: ["badminton"], primarySport: "badminton",
    pricePerHour: 24, rating: 4.9, reviewCount: 482,
    surface: "Synthetic", indoor: true,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: true,
    featured: true,
  },
  {
    name: "Markham Shuttle Club",
    tagline: "Pro-spec courts · National coaches",
    city: "Markham", neighbourhood: "Cathedraltown",
    address: "10 Major Mackenzie Dr E",
    lat: 43.8830, lng: -79.3370,
    sports: ["badminton"], primarySport: "badminton",
    pricePerHour: 22, rating: 4.8, reviewCount: 367,
    surface: "Synthetic", indoor: true,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: false,
  },
  {
    name: "Toronto Badminton House",
    tagline: "Historic club · Members & guests",
    city: "Toronto", neighbourhood: "Forest Hill",
    address: "25 Tarlton Rd, Toronto, ON M5P 2M4",
    lat: 43.6960, lng: -79.4150,
    sports: ["badminton"], primarySport: "badminton",
    pricePerHour: 28, rating: 4.6, reviewCount: 220,
    surface: "Hardwood", indoor: true,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: true,
  },
  {
    name: "Vaughan Racquet Centre",
    tagline: "8 courts · Late-night drop-ins",
    city: "Vaughan", neighbourhood: "Concord",
    address: "100 Bass Pro Mills Dr",
    lat: 43.8090, lng: -79.5470,
    sports: ["badminton", "table-tennis"], primarySport: "badminton",
    pricePerHour: 20, rating: 4.5, reviewCount: 156,
    surface: "Synthetic", indoor: true,
    kidsFriendly: false, parking: true, coaching: false, foodCourt: false,
  },

  // ── BASKETBALL ─────────────────────────────────────────────────────────────
  {
    name: "The Six Hoops Club",
    tagline: "Downtown hardwood · NBA-spec hoops",
    city: "Toronto", neighbourhood: "King West",
    address: "20 Bathurst St, Toronto, ON M5V 0E2",
    lat: 43.6395, lng: -79.4000,
    sports: ["basketball"], primarySport: "basketball",
    pricePerHour: 40, rating: 4.8, reviewCount: 412,
    surface: "Hardwood", indoor: true,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: true,
    featured: true,
  },
  {
    name: "Scarborough Hoops Hub",
    tagline: "Full court · Run pickup nightly",
    city: "Scarborough", neighbourhood: "Agincourt",
    address: "3850 Sheppard Ave E",
    lat: 43.7820, lng: -79.2960,
    sports: ["basketball"], primarySport: "basketball",
    pricePerHour: 30, rating: 4.6, reviewCount: 211,
    surface: "Hardwood", indoor: true,
    kidsFriendly: true, parking: true, coaching: false, foodCourt: false,
  },

  // ── SOCCER ─────────────────────────────────────────────────────────────────
  {
    name: "Vaughan Soccer Dome",
    tagline: "FIFA-grade turf · 11-a-side dome",
    city: "Vaughan", neighbourhood: "Maple",
    address: "9580 Jane St, Vaughan, ON L6A 4H6",
    lat: 43.8590, lng: -79.5310,
    sports: ["soccer"], primarySport: "soccer",
    pricePerHour: 90, rating: 4.9, reviewCount: 528,
    surface: "Turf", indoor: true,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: true,
    featured: true,
  },
  {
    name: "Toronto Goals Arena",
    tagline: "5-a-side & 7-a-side · Late nights",
    city: "Toronto", neighbourhood: "Liberty Village",
    address: "171 East Liberty St",
    lat: 43.6390, lng: -79.4180,
    sports: ["soccer"], primarySport: "soccer",
    pricePerHour: 65, rating: 4.7, reviewCount: 298,
    surface: "Turf", indoor: true,
    kidsFriendly: true, parking: false, coaching: true, foodCourt: true,
  },
  {
    name: "Brampton Premier Pitches",
    tagline: "Outdoor + dome · Leagues nightly",
    city: "Brampton", neighbourhood: "Heart Lake",
    address: "1054 Sandalwood Pkwy E",
    lat: 43.7250, lng: -79.7600,
    sports: ["soccer"], primarySport: "soccer",
    pricePerHour: 70, rating: 4.6, reviewCount: 233,
    surface: "Turf", indoor: false,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: false,
  },

  // ── PICKLEBALL ─────────────────────────────────────────────────────────────
  {
    name: "Vaughan Pickleball Club",
    tagline: "10 dedicated indoor courts",
    city: "Vaughan", neighbourhood: "Woodbridge",
    address: "8500 Hwy 27, Vaughan, ON L4L 1A6",
    lat: 43.7900, lng: -79.6080,
    sports: ["pickleball"], primarySport: "pickleball",
    pricePerHour: 22, rating: 4.9, reviewCount: 374,
    surface: "Synthetic", indoor: true,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: true,
    featured: true,
  },
  {
    name: "Mississauga Pickleball House",
    tagline: "Open play · Ladder leagues",
    city: "Mississauga", neighbourhood: "Erin Mills",
    address: "5100 Erin Mills Pkwy",
    lat: 43.5520, lng: -79.7100,
    sports: ["pickleball"], primarySport: "pickleball",
    pricePerHour: 18, rating: 4.7, reviewCount: 198,
    surface: "Synthetic", indoor: true,
    kidsFriendly: true, parking: true, coaching: false, foodCourt: false,
  },

  // ── TENNIS ─────────────────────────────────────────────────────────────────
  {
    name: "Markham Tennis Club",
    tagline: "Hard + clay · Ball machines",
    city: "Markham", neighbourhood: "Berczy",
    address: "8500 Warden Ave, Markham, ON L6G 1A1",
    lat: 43.8810, lng: -79.3290,
    sports: ["tennis"], primarySport: "tennis",
    pricePerHour: 30, rating: 4.8, reviewCount: 264,
    surface: "Clay", indoor: false,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: true,
  },
  {
    name: "Scarborough Tennis Centre",
    tagline: "Lit hard courts · Year-round bubble",
    city: "Scarborough", neighbourhood: "Birch Cliff",
    address: "1525 Kingston Rd",
    lat: 43.6900, lng: -79.2680,
    sports: ["tennis"], primarySport: "tennis",
    pricePerHour: 26, rating: 4.6, reviewCount: 142,
    surface: "Synthetic", indoor: true,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: false,
  },

  // ── VOLLEYBALL ─────────────────────────────────────────────────────────────
  {
    name: "Toronto Volleyball Club",
    tagline: "Indoor hardwood + sand pit",
    city: "Toronto", neighbourhood: "Leslieville",
    address: "1140 Queen St E, Toronto, ON M4M 1L1",
    lat: 43.6620, lng: -79.3350,
    sports: ["volleyball"], primarySport: "volleyball",
    pricePerHour: 32, rating: 4.7, reviewCount: 187,
    surface: "Hardwood", indoor: true,
    kidsFriendly: true, parking: false, coaching: true, foodCourt: true,
  },

  // ── TABLE TENNIS ───────────────────────────────────────────────────────────
  {
    name: "Mississauga Table Tennis Centre",
    tagline: "Butterfly tables · Robot trainers",
    city: "Mississauga", neighbourhood: "Square One",
    address: "100 City Centre Dr, Mississauga, ON L5B 2C9",
    lat: 43.5930, lng: -79.6440,
    sports: ["table-tennis"], primarySport: "table-tennis",
    pricePerHour: 12, rating: 4.8, reviewCount: 309,
    surface: "Hardwood", indoor: true,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: false,
  },

  // ── ICE HOCKEY ─────────────────────────────────────────────────────────────
  {
    name: "Vaughan Iceplex",
    tagline: "4 NHL-spec pads · Stick & puck",
    city: "Vaughan", neighbourhood: "Kleinburg",
    address: "60 Edgeley Blvd, Vaughan, ON L4K 2Y2",
    lat: 43.7900, lng: -79.5350,
    sports: ["ice-hockey"], primarySport: "ice-hockey",
    pricePerHour: 240, rating: 4.7, reviewCount: 167,
    surface: "Ice", indoor: true,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: true,
    featured: true,
  },

  // ── FITNESS ────────────────────────────────────────────────────────────────
  {
    name: "Athletix Strength Lab",
    tagline: "Hammer racks · Sled track · Sauna",
    city: "Toronto", neighbourhood: "Yorkville",
    address: "100 Yorkville Ave, Toronto, ON M5R 1B9",
    lat: 43.6720, lng: -79.3920,
    sports: ["fitness"], primarySport: "fitness",
    pricePerHour: 18, rating: 4.9, reviewCount: 612,
    surface: "Synthetic", indoor: true,
    kidsFriendly: false, parking: true, coaching: true, foodCourt: true,
    featured: true,
  },

  // ── SWIMMING ───────────────────────────────────────────────────────────────
  {
    name: "Markham Aquatic Centre",
    tagline: "50 m olympic pool · Lane bookings",
    city: "Markham", neighbourhood: "Cornell",
    address: "3201 Bur Oak Ave, Markham, ON L6B 0T2",
    lat: 43.8830, lng: -79.2570,
    sports: ["swimming"], primarySport: "swimming",
    pricePerHour: 15, rating: 4.8, reviewCount: 274,
    surface: "Pool", indoor: true,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: false,
  },

  // ── Combo / Bonus ──────────────────────────────────────────────────────────
  {
    name: "Brampton Sportsplex",
    tagline: "Multi-sport · Cricket · Soccer · Hoops",
    city: "Brampton", neighbourhood: "Mount Pleasant",
    address: "100 Sandalwood Pkwy W",
    lat: 43.7180, lng: -79.7820,
    sports: ["cricket", "soccer", "basketball"], primarySport: "soccer",
    pricePerHour: 50, rating: 4.7, reviewCount: 421,
    surface: "Turf", indoor: true,
    kidsFriendly: true, parking: true, coaching: true, foodCourt: true,
    featured: true,
  },
  {
    name: "Scarborough Multi-Sport Arena",
    tagline: "Badminton · Pickleball · TT",
    city: "Scarborough", neighbourhood: "Malvern",
    address: "1900 Eglinton Ave E",
    lat: 43.7470, lng: -79.2620,
    sports: ["badminton", "pickleball", "table-tennis"], primarySport: "badminton",
    pricePerHour: 18, rating: 4.6, reviewCount: 188,
    surface: "Synthetic", indoor: true,
    kidsFriendly: true, parking: true, coaching: false, foodCourt: false,
  },
];

const COMMON_AMENITIES = [
  "Free Wi-Fi", "Change rooms", "Pro shop", "Showers", "Lounge area",
  "Water refill stations", "Equipment rentals", "Accessible entrance",
];

const RULES = [
  "Non-marking shoes required on court",
  "Arrive 10 minutes before your slot",
  "Outside food allowed in lounge only",
  "Respect other players & staff",
];

const CANCELLATION = "Full refund up to 24 hours before slot. 50% refund up to 4 hours before. Non-refundable within 4 hours.";

export const VENUES: Venue[] = RAW.map((v, i) => {
  const seed = i * 17 + 7;
  const slug = v.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const sportKey = v.primarySport as keyof typeof IMG;
  const images = IMG[sportKey] ?? IMG.cricket;
  return {
    id: `v-${i + 1}`,
    slug,
    name: v.name,
    tagline: v.tagline,
    city: v.city,
    neighbourhood: v.neighbourhood,
    address: v.address,
    lat: v.lat,
    lng: v.lng,
    sports: v.sports,
    primarySport: v.primarySport,
    pricePerHour: v.pricePerHour,
    rating: v.rating,
    reviewCount: v.reviewCount,
    surface: v.surface,
    indoor: v.indoor,
    kidsFriendly: v.kidsFriendly,
    parking: v.parking,
    coaching: v.coaching,
    foodCourt: v.foodCourt,
    washrooms: true,
    amenities: v.amenities ?? COMMON_AMENITIES,
    rules: v.rules ?? RULES,
    cancellationPolicy: CANCELLATION,
    images,
    owner: {
      name: ["Aman Patel", "Sophia Chen", "Marco Romano", "Jasleen Kaur", "Ryan Walsh"][i % 5],
      since: 2018 + (i % 7),
      verified: true,
    },
    slots: buildSlots(seed, v.pricePerHour),
    reviews: buildReviews(seed),
    occupancy: 25 + ((seed * 13) % 70),
    tags: v.tags ?? [
      v.indoor ? "Indoor" : "Outdoor",
      v.kidsFriendly ? "Kids friendly" : "Adults",
      v.coaching ? "Coaching" : "Self play",
    ],
    featured: v.featured,
  };
});

export const VENUE_BY_SLUG = Object.fromEntries(VENUES.map((v) => [v.slug, v]));

export const FEATURED_VENUES = VENUES.filter((v) => v.featured);
