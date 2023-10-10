import { z } from "zod";

const ProductSchema = z.object({
  company: z.string(),
  product: z.string(),
  companyURL: z.string().url(),
  productURL: z.string().url(),
  imageURL: z.string().url(),
});

const SubgroupSchema = z.object({
  Name: z.string(),
  Products: z.array(ProductSchema),
});

const GroupSchema = z.object({
  Title: z.string(),
  Description: z.string(),
  Subgroups: z.array(SubgroupSchema),
});

export const TreeSchema = z.object({
  Title: z.string(),
  Description: z.string(),
  Groups: z.array(GroupSchema),
});
