"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Booking } from "@/lib/types";

interface State {
  bookings: Booking[];
  favorites: string[];
  addBooking: (b: Booking) => void;
  toggleFavorite: (venueId: string) => void;
  isFavorite: (venueId: string) => boolean;
}

export const useBookingStore = create<State>()(
  persist(
    (set, get) => ({
      bookings: [],
      favorites: [],
      addBooking: (b) => set({ bookings: [b, ...get().bookings] }),
      toggleFavorite: (id) =>
        set({
          favorites: get().favorites.includes(id)
            ? get().favorites.filter((x) => x !== id)
            : [...get().favorites, id],
        }),
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: "athletix-store-v1",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
