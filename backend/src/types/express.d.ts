import 'express'

declare module 'express-serve-static-core' {
  interface Request {
    session: {
      isAuthenticated: boolean,
      userId: string
    }
  }
}