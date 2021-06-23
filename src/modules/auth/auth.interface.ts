export interface AccessToken {
  token: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface UserPayload {
  id: string;
  username: string;
  email: string;
}

export interface TokenField {
  user_id?: string;
  value?: string;
}
