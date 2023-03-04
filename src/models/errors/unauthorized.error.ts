import { ApplicationError } from './application.error';

export class UnauthorizedError extends ApplicationError {
  constructor(message: string) {
    super(401, 'AUTHENTICATION_ERROR', message);
  }
}
