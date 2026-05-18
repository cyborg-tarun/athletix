export interface Testimonial {
  name: string;
  role: string;
  city: string;
  quote: string;
  rating: number;
  color: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Arjun Sharma",
    role: "Cricket captain",
    city: "Brampton",
    quote: "ATHLETIX killed the WhatsApp group chaos. We book Brampton Box every Friday in 30 seconds.",
    rating: 5,
    color: "#19e168",
  },
  {
    name: "Sofia Martinez",
    role: "Pickleball coach",
    city: "Vaughan",
    quote: "My students love how clean the booking and check-in flow is. The QR receipt is *chef's kiss*.",
    rating: 5,
    color: "#ff3da6",
  },
  {
    name: "Liam Tanaka",
    role: "Weekend hooper",
    city: "Toronto",
    quote: "Found 4 new courts in my neighbourhood I didn't even know existed. The map experience is unreal.",
    rating: 5,
    color: "#7cc3ff",
  },
  {
    name: "Priya Kapoor",
    role: "Badminton mom",
    city: "Mississauga",
    quote: "I block my daughter's coaching slots a month out. Cancellation is a single tap if plans change.",
    rating: 5,
    color: "#ffb547",
  },
  {
    name: "Daniel Chen",
    role: "5-a-side organiser",
    city: "Markham",
    quote: "Live occupancy + slot heatmaps mean we never double-book the dome again. Game changer.",
    rating: 5,
    color: "#5cf09a",
  },
  {
    name: "Aisha Noor",
    role: "Tennis enthusiast",
    city: "Scarborough",
    quote: "Feels like a luxury app — but for sports. Booking a clay court has never been this satisfying.",
    rating: 5,
    color: "#0a84ff",
  },
];
