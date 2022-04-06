export class AuthResponse {
  jwt: string;
  expiresIn: string;

  constructor(jwt: string, expiresIn: string) {
    this.jwt = jwt;
    this.expiresIn = expiresIn;
  }
}
