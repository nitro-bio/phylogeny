import { z } from "zod";

const ProductSchema = z.object({
  company: z.string(),
  product: z.string(),
  company_url: z.string().url(),
  product_url: z.string().url(),
  image_url: z.string().url(),
});
export type Product = z.infer<typeof ProductSchema>;

const SubgroupSchema = z.object({
  name: z.string(),
  products: z.array(ProductSchema),
});
export type Subgroup = z.infer<typeof SubgroupSchema>;

const GroupSchema = z.object({
  title: z.string(),
  description: z.string(),
  subgroups: z.array(SubgroupSchema),
});
export type Group = z.infer<typeof GroupSchema>;

export const TreeSchema = z.object({
  title: z.string(),
  description: z.string(),
  groups: z.array(GroupSchema),
});
export type Tree = z.infer<typeof TreeSchema>;
