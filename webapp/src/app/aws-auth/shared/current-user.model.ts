export interface CurrentUser {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  email: string;
  username: string;
  id: string;
  expiresAt: number;
  admin: boolean;
}
