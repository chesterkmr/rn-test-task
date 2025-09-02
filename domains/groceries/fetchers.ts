import { httpClient } from "@/utils/http-client/http-client";
import { z } from "zod";
import { GroceryItemSchema, GroceryStatusEnum, TGroceryItem } from "./schemas";

export const GetGroceriesResponseSchema = z.array(GroceryItemSchema);

export type TGetGroceriesResponse = z.infer<typeof GetGroceriesResponseSchema>;

export const GetGroceriesQueryParamsSchema = z.object({
  query: z.string().default(""),
  status: z
    .enum([GroceryStatusEnum.PENDING, GroceryStatusEnum.BOUGHT, "ALL"])
    .default("ALL"),
});

export const DEFAULT_GET_GROCERIES_QUERY_PARAMS =
  GetGroceriesQueryParamsSchema.parse({});

export type TGetGroceriesQueryParams = z.infer<
  typeof GetGroceriesQueryParamsSchema
>;

export const fetchGroceries = async (queryParams: TGetGroceriesQueryParams) => {
  const response = await httpClient.get<TGetGroceriesResponse>("/groceries", {
    responseSchema: GetGroceriesResponseSchema,
    queryParamsSchema: GetGroceriesQueryParamsSchema,
    params: {
      name_like: queryParams.query,
    },
  });

  return response.data;
};

export const fetchGrocery = async (id: string) => {
  const response = await httpClient.get<TGroceryItem>(`/groceries/${id}`, {
    responseSchema: GroceryItemSchema,
  });

  return response.data;
};

export const CreateGrocerySchema = GroceryItemSchema.extend({
  name: z.string().min(1, "Name is required"),
  quantity: z.number().min(1, "Minimum quantity is 1"),
});

export type TCreateGrocery = z.infer<typeof CreateGrocerySchema>;

const CreateGroceryResponseSchema = GroceryItemSchema;

export type TCreateGroceryResponse = z.infer<
  typeof CreateGroceryResponseSchema
>;

export const createGrocery = async (grocery: TCreateGrocery) => {
  const response = await httpClient.post<TCreateGroceryResponse>(
    "/groceries",
    grocery,
    {
      responseSchema: CreateGroceryResponseSchema,
      schema: CreateGrocerySchema,
    }
  );

  return response.data;
};

export const deleteGrocery = async (id: string) => {
  await httpClient.delete<void>(`/groceries/${id}`);
};

const UpdateGrocerySchema = GroceryItemSchema.partial({
  name: true,
  quantity: true,
  status: true,
});
export type TUpdateGrocery = z.infer<typeof UpdateGrocerySchema>;

const UpdateGroceryResponseSchema = GroceryItemSchema;

export type TUpdateGroceryResponse = z.infer<
  typeof UpdateGroceryResponseSchema
>;

export const updateGrocery = async (id: string, grocery: TUpdateGrocery) => {
  const response = await httpClient.patch<TUpdateGroceryResponse>(
    `/groceries/${id}`,
    {
      id,
      quantity: grocery.quantity,
      status: grocery.status,
      name: grocery.name,
    },
    {
      responseSchema: UpdateGroceryResponseSchema,
      schema: UpdateGrocerySchema,
    }
  );

  return response.data;
};
