import z from "zod";

export const GroceryStatusEnum = {
  PENDING: "PENDING",
  BOUGHT: "BOUGHT",
} as const;

export const GroceryItemStatusSchema = z.enum(Object.values(GroceryStatusEnum));

export type TGroceryItemStatus = z.infer<typeof GroceryItemStatusSchema>;

export const GroceryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  status: GroceryItemStatusSchema,
});

export type TGroceryItem = z.infer<typeof GroceryItemSchema>;
