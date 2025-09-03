import z from "zod";
import { GroceryStatusEnum } from "./enums";

export const GroceryItemStatusSchema = z.enum(Object.values(GroceryStatusEnum));

export type TGroceryItemStatus = z.infer<typeof GroceryItemStatusSchema>;

export const GroceryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  status: GroceryItemStatusSchema,
});

export type TGroceryItem = z.infer<typeof GroceryItemSchema>;

export const GetGroceriesResponseSchema = z.array(GroceryItemSchema);

export type TGetGroceriesResponse = z.infer<typeof GetGroceriesResponseSchema>;

export const GetGroceriesQueryParamsSchema = z.object({
  query: z.string().default(""),
  status: z
    .enum([GroceryStatusEnum.PENDING, GroceryStatusEnum.BOUGHT, "ALL"])
    .default("ALL"),
});

export type TGetGroceriesQueryParams = z.infer<
  typeof GetGroceriesQueryParamsSchema
>;

export const CreateGrocerySchema = GroceryItemSchema.extend({
  name: z.string().min(1, "Name is required"),
  quantity: z.number().min(1, "Minimum quantity is 1"),
});

export type TCreateGrocery = z.infer<typeof CreateGrocerySchema>;

export const CreateGroceryResponseSchema = GroceryItemSchema;

export type TCreateGroceryResponse = z.infer<
  typeof CreateGroceryResponseSchema
>;

export const UpdateGrocerySchema = GroceryItemSchema.partial({
  name: true,
  quantity: true,
  status: true,
});
export type TUpdateGrocery = z.infer<typeof UpdateGrocerySchema>;

export const UpdateGroceryResponseSchema = GroceryItemSchema;

export type TUpdateGroceryResponse = z.infer<
  typeof UpdateGroceryResponseSchema
>;
