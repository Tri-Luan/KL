// export interface LoginRes {
//   IsSuccessful: boolean;
//   ErrorMessage: [];
//   UserId: number;
//   Token: { accessToken: string; refreshToken: string };
// }

export class LoginRes {
  isSuccessful?: boolean;
  errorMessage?: [];
  userId?: number;
  token?: { accessToken: string; refreshToken: string };
}
