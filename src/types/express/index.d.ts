declare global {
  namespace Express {
    interface Request {
      userId?: Record<string,any>
    }
  }
}
