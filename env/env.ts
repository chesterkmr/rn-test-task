import { z } from "zod";

const EnvSchema = z
  .object({
    EXPO_PUBLIC_API_URL: z.string(),
  })
  .transform((data) => ({
    apiUrl: data.EXPO_PUBLIC_API_URL,
  }));

export const env = EnvSchema.parse(process.env);

export type TEnv = z.infer<typeof EnvSchema>;
