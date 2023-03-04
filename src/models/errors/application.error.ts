export class ApplicationError extends Error {
  code: string;
  message: string;
  httpStatus: number;

  constructor(httpStatus: number, code: string, message: string) {
    super();
    this.httpStatus = httpStatus;
    this.code = code;
    this.message = message;
  }
}
