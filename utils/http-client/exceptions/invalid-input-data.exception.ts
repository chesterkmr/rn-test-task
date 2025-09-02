import { ZodError } from "zod";

export class InvalidInputData extends Error {
  constructor(message: string, public details?: ZodError["issues"]) {
    let fullMessage = message;

    if (details && details.length > 0) {
      const validationErrors = details
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      fullMessage = `${message}. Validation errors: ${validationErrors}`;
    }

    super(fullMessage);
    this.name = "InvalidInputData";
  }
}
