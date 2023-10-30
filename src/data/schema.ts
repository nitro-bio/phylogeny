import { z } from "zod";

export const ProductSchema = z.object({
  company: z.string(),
  product: z.string(),
  company_url: z.string().url().nullable(),
  product_url: z.string().url().nullable(),
  image_url: z.string().url().nullable(),
});
export type Product = z.infer<typeof ProductSchema>;

export const SubgroupSchema = z.object({
  name: z.string(),
  products: z.array(ProductSchema),
});
export type Subgroup = z.infer<typeof SubgroupSchema>;

export const GroupSchema = z.object({
  title: z.string(),
  description: z.string(),
  subgroups: z.array(SubgroupSchema),
});
export type Group = z.infer<typeof GroupSchema>;

export const CategorySchema = z.object({
  title: z.string(),
  className: z.string().optional(),
  groups: z.array(GroupSchema),
});
export type Category = z.infer<typeof CategorySchema>;

export const TreeSchema = z.object({
  title: z.string(),
  className: z.string().optional(),
  description: z.string(),
  categories: z.array(CategorySchema),
});
export type Tree = z.infer<typeof TreeSchema>;
