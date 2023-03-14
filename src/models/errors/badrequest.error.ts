import { ApplicationError } from "./application.error";

export class BadRequestError extends ApplicationError {
  constructor(message: string) {
    super(400, "BAD_REQUEST", message);
  }
}
