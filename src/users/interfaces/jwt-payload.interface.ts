export interface JwtPayload {
    username: string;
    userId: number;
    roles?: string[]; // Optional for role-based access control
    iat?: number;     // Optional "issued at" timestamp
    exp?: number;     // Optional: "expiration time" timestamp
  }