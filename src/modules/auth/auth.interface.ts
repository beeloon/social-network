export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface TokenField {
  user_id?: string;
  value?: string;
}

export interface UserPayload {
  id: string;
  username: string;
  email: string;
}

export interface JWTPayload {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}
