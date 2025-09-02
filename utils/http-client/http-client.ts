import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { z, ZodSchema } from "zod";
import { InvalidInputData } from "./exceptions/invalid-input-data.exception";
import { InvalidResponseData } from "./exceptions/invalid-response-data.exception";
import { env } from "@/env/env";

interface HttpClientRequestConfig<T = any> extends AxiosRequestConfig<T> {
  schema?: ZodSchema;
  responseSchema?: ZodSchema;
  queryParamsSchema?: ZodSchema;
}

interface HttpClientInitializationParams {
  apiUrl: string;
  timeout?: number;
}

export class HttpClient {
  private instance: AxiosInstance;
  private DEFAULT_TIMEOUT = 10_000;

  constructor(params: HttpClientInitializationParams) {
    const { apiUrl, timeout = this.DEFAULT_TIMEOUT } = params;

    this.instance = axios.create({
      baseURL: apiUrl,
      timeout,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const { schema, data, queryParamsSchema, params } =
          config as HttpClientRequestConfig;

        // Validate request body data
        if (schema && data) {
          try {
            schema.parse(data);
          } catch (error) {
            if (error instanceof z.ZodError) {
              throw new InvalidInputData(
                "Input data validation failed",
                error.issues
              );
            }
            throw error;
          }
        }

        // Validate query parameters
        if (queryParamsSchema && params) {
          try {
            queryParamsSchema.parse(params);
          } catch (error) {
            if (error instanceof z.ZodError) {
              throw new InvalidInputData(
                "Query parameters validation failed",
                error.issues
              );
            }
            throw error;
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const config = response.config as HttpClientRequestConfig;
        const { responseSchema } = config;

        if (responseSchema) {
          try {
            responseSchema.parse(response.data);
          } catch (error) {
            if (error instanceof z.ZodError) {
              throw new InvalidResponseData(
                "Response data validation failed",
                error.issues
              );
            }
            throw error;
          }
        }

        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async get<T = any>(
    url: string,
    config?: HttpClientRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config);
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: HttpClientRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data, config);
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: HttpClientRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put(url, data, config);
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: HttpClientRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch(url, data, config);
  }

  async delete<T = any>(
    url: string,
    config?: HttpClientRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete(url, config);
  }
}

export const httpClient = new HttpClient({ apiUrl: env.apiUrl });
