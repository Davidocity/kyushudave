import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    title: z.string(),
    post_layout: z.string().optional(),
    sidebar: z.string(),
  }),
});

// Post collection schema
const postCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/post" }),
  schema: z.object({
    ...commonFields,
    images: z.array(z.string()).optional(),
    author: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    type: z.enum(["regular", "featured"]).optional(),
    search_keyword: z.string().optional(),
  }),
});

// About Page Schema
const aboutPageSchema = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/about" }),
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

// About Page Schema
const contactPageSchema = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/contact" }),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/author" }),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
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
