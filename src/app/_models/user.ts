export class User {

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token?: string;
}
