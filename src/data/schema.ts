import { z } from "zod";

const ProductSchema = z.object({
  company: z.string(),
  product: z.string(),
  company_url: z.string().url(),
  product_url: z.string().url(),
  image_url: z.string().url(),
});

const SubgroupSchema = z.object({
  name: z.string(),
  products: z.array(ProductSchema),
});

const GroupSchema = z.object({
  title: z.string(),
  description: z.string(),
  subgroups: z.array(SubgroupSchema),
});

export const TreeSchema = z.object({
  title: z.string(),
  description: z.string(),
  groups: z.array(GroupSchema),
});
