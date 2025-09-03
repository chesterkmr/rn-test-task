import { httpClient } from "@/utils/http-client/http-client";
import { z } from "zod";
import {
  CreateGroceryResponseSchema,
  CreateGrocerySchema,
  GetGroceriesQueryParamsSchema,
  GetGroceriesResponseSchema,
  GroceryItemSchema,
  TCreateGrocery,
  TCreateGroceryResponse,
  TGetGroceriesResponse,
  TGroceryItem,
  TUpdateGrocery,
  TUpdateGroceryResponse,
  UpdateGroceryResponseSchema,
  UpdateGrocerySchema,
} from "./schemas";

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
