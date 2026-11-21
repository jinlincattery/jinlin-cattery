import { defineCollection, z } from 'astro:content';

// 在售猫集合
const kittens = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    breed: z.string(),
    breed_en: z.string(),
    colour: z.string(),
    colour_en: z.string(),
    gender: z.string(),
    age: z.number(),
    status: z.enum(['available', 'reserved', 'waitlist']),
    photo: z.string(),
    video: z.string().optional().default(''),
    description_zh: z.string(),
    description_en: z.string(),
    order: z.number().default(0),
  }),
});

// 品种集合
const breeds = defineCollection({
  type: 'content',
  schema: z.object({
    name_zh: z.string(),
    name_en: z.string(),
    tagline_zh: z.string(),
    tagline_en: z.string(),
    body_zh: z.string(),
    body_en: z.string(),
    photo: z.string(),
    order: z.number().default(0),
  }),
});

// FAQ 集合
const faq = defineCollection({
  type: 'content',
  schema: z.object({
    question_zh: z.string(),
    question_en: z.string(),
    answer_zh: z.string(),
    answer_en: z.string(),
    order: z.number().default(0),
  }),
});

// 站点设置（单文件）
const site = defineCollection({
  type: 'content',
  schema: z.object({
    brand: z.string(),
    tagline_zh: z.string(),
    tagline_en: z.string(),
    hero_title_zh: z.string(),
    hero_title_en: z.string(),
    hero_sub_zh: z.string(),
    hero_sub_en: z.string(),
    whatsapp: z.string(),
    email: z.string(),
    instagram: z.string().optional().default(''),
    tiktok: z.string().optional().default(''),
  }),
});

export const collections = { kittens, breeds, faq, site };
