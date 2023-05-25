export interface User {
  Id: number;
  FirstName: string;
  LastName: string;
  DateOfBirth: Date;
  PhoneNumber: number;
  UserName: string;
  Email: string;
  Role: string;
  Permission: [Array<string>];
}

export class AuthUser {
  userName?: string;
  email?: string;
  password?: string;
  rePassword?: string;
}

export class User {
  constructor(
    private id: number,
    private firstName: string,
    private lastName: string,
    private dateOfBirth: Date,
    private phoneNumber: number,
    private userName: string,
    private email: string,
    private role: string,
    private permission: [Array<string>],
    private _token: { accessToken: string; refreshToken: string }
  ) {}
  get token() {
    return this._token;
  }
}
