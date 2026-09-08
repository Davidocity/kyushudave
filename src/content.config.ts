import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { destinationIds } from "./data/destinations";

/*
 * KyushuDave controlled taxonomy
 *
 * These values are the canonical internal values used in post frontmatter.
 * Keep them lowercase and use hyphens between words.
 */

const contentTypes = [
  "destination",
  "attraction",
  "itinerary",
  "transport",
  "planning",
  "accommodation",
  "food",
  "seasonal",
  "map",
  "experience",
] as const;

const prefectures = [
  "fukuoka",
  "saga",
  "nagasaki",
  "kumamoto",
  "oita",
  "miyazaki",
  "kagoshima",
] as const;

const areas = [
  "hakata",
  "tenjin",
  "momochi",
] as const;

const categories = [
  "hiking",
  "photography",
  "food-drink",
  "culture",
  "nature",
  "history",
  "beaches",
  "shrines-temples",
  "shopping",
  "nightlife",
  "onsen",
] as const;

const experiences = [
  "scenic-views",
  "sunrise",
  "sunset",
  "scenic-drives",
  "forest-walks",
  "swimming",
  "volcanoes",
  "mountains",
  "walking",
  "castles",
  "gardens",
  "food-markets",
  "street-food",
  "waterfalls",
  "wildlife",
  "islands",
  "coastlines",
  "festivals",
  "pottery",
  "cycling",
  "boat-rides",
  "snorkeling",
  "ryokan",
  "ferry",
] as const;

const bestMonths = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;


/*
 * Fields shared by several collections
 */

const commonFields = {
  title: z.string(),
  description: z.string(),
  meta_title: z.string().optional(),
  date: z.coerce.date().optional(),
  image: z.string().optional(),
  image_caption: z.string().optional(),
  draft: z.boolean().optional(),
};


// Homepage collection schema
const homepageCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/homepage",
  }),

  schema: z.object({
    title: z.string(),
    post_layout: z.string().optional(),
    sidebar: z.string(),
  }),
});


// Post collection schema
const postCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/post",
  }),

  schema: z.object({
    ...commonFields,

    images: z.array(z.string()).optional(),
    author: z.string().optional(),
    summary: z.string().optional(),

    /*
     * KyushuDave taxonomy
     */

    contentType: z.enum(contentTypes).optional(),

    prefecture: z.enum(prefectures).optional(),

    destination: z.enum(destinationIds).optional(),

    area: z.enum(areas).optional(),

    categories: z.array(z.enum(categories)).optional(),

    experiences: z.array(z.enum(experiences)).optional(),

    bestMonths: z.array(z.enum(bestMonths)).optional(),

    lastVisited: z.coerce.date().optional(),

    lastVerified: z.coerce.date().optional(),

    /*
     * Existing post fields
     */

    tags: z.array(z.string()).optional(),

    type: z.enum(["regular", "featured"]).optional(),

    search_keyword: z.string().optional(),
  }),
});


// About Page Schema
const aboutPageSchema = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/about",
  }),

  schema: z.object({
    ...commonFields,

    email: z.email(),

    social: z.array(
      z.object({
        name: z.string(),
        icon: z.string(),
        link: z.url(),
      }),
    ),
  }),
});


// Contact Page Schema
const contactPageSchema = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/contact",
  }),

  schema: z.object({
    ...commonFields,

    about: z.object({
      title: z.string(),
      content: z.string(),
    }),

    mail: z.object({
      title: z.string(),
      address: z.email(),
    }),
  }),
});


// Author collection schema
const authorCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/author",
  }),

  schema: z.object({
    ...commonFields,

    email: z.string().optional(),

    social: z
      .array(
        z
          .object({
            name: z.string().optional(),
            icon: z.string().optional(),
            link: z.string().optional(),
          })
          .optional(),
      )
      .optional(),
  }),
});


// Pages collection schema
const pagesCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/pages",
  }),

  schema: z.object({
    ...commonFields,
  }),
});


// Export collections
export const collections = {
  homepage: homepageCollection,
  post: postCollection,
  about: aboutPageSchema,
  contact: contactPageSchema,
  author: authorCollection,
  pages: pagesCollection,
};