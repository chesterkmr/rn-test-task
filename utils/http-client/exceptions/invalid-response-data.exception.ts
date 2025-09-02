import { ZodError } from "zod";

export class InvalidResponseData extends Error {
  constructor(message: string, public details: ZodError["issues"]) {
    const validationErrors = details
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");

    const errorMessage = `${message}. Validation errors: ${validationErrors}`;

    super(errorMessage);
    this.name = "InvalidResponseData";
  }
}
