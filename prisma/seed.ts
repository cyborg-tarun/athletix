/* eslint-disable no-console */
/**
 * ATHLETIX seed.
 * Mirrors src/lib/data/* into Postgres via Prisma.
 *
 *   pnpm prisma db push
 *   pnpm tsx prisma/seed.ts
 *
 * (Add to package.json scripts.seed if you want one-liner.)
 */

import { PrismaClient } from "@prisma/client";
import { SPORTS } from "../src/lib/data/sports";
import { VENUES } from "../src/lib/data/venues";
import { EVENTS } from "../src/lib/data/events";

const prisma = new PrismaClient();

async function main() {
  console.log("[seed] clearing existing data…");
  await prisma.booking.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.review.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.venueSport.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.sport.deleteMany();
  await prisma.event.deleteMany();

  console.log("[seed] sports…");
  const sportRows = await Promise.all(
    SPORTS.map((s) =>
      prisma.sport.create({
        data: { slug: s.slug, name: s.name, emoji: s.emoji, tagline: s.tagline, hero: s.hero },
      }),
    ),
  );
  const sportBySlug = Object.fromEntries(sportRows.map((s) => [s.slug, s]));

  console.log("[seed] venues…");
  for (const v of VENUES) {
    const venue = await prisma.venue.create({
      data: {
        slug: v.slug,
        name: v.name,
        tagline: v.tagline,
        description: v.tagline,
        address: v.address,
        neighbourhood: v.neighbourhood,
        city: v.city,
        lat: v.lat,
        lng: v.lng,
        pricePerHour: v.pricePerHour,
        rating: v.rating,
        reviewCount: v.reviewCount,
        surface: v.surface,
        indoor: v.indoor,
        kidsFriendly: v.kidsFriendly,
        parking: v.parking,
        coaching: v.coaching,
        foodCourt: v.foodCourt,
        washrooms: v.washrooms,
        amenities: v.amenities,
        rules: v.rules,
        cancellationPolicy: v.cancellationPolicy,
        images: v.images,
        featured: !!v.featured,
        occupancy: v.occupancy,
        ownerName: v.owner.name,
        ownerSince: v.owner.since,
        ownerVerified: v.owner.verified,
        sports: {
          create: v.sports.map((slug) => ({ sport: { connect: { id: sportBySlug[slug].id } } })),
        },
        slots: {
          create: v.slots.map((s) => ({
            date: new Date(),
            hour: s.hour,
            duration: s.duration,
            price: s.price,
            available: s.available,
          })),
        },
      },
    });
    console.log("[seed] +venue", venue.slug);
  }

  console.log("[seed] events…");
  for (const e of EVENTS) {
    await prisma.event.create({
      data: {
        title: e.title,
        category: e.category,
        sport: e.sport,
        city: e.city,
        date: new Date(e.date),
        image: e.image,
        excerpt: e.excerpt,
        pill: e.pill,
      },
    });
  }

  console.log("[seed] done.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
