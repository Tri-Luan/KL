// export interface RegisterRes {
//   IsSuccess: boolean;
//   ErrorMessage: [];
// }

export class RegisterRes {
  isSuccessful?: boolean;
  errorMessages?: [Array<string>];
}
