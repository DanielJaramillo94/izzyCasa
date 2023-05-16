export class User {
  public id: string;
  public email: string;
  public name: string;
  public surname: string;
  public firebaseUID: string;
  public phone: string;
  public initialMessage: string;
}

export type UserId = Pick<
  User,
  'id' | 'email' | 'name' | 'surname' | 'firebaseUID' | 'phone'
>;

export type UserInfo = Pick<User, 'initialMessage'>;

export class UserMessages {
  public initialMessage: { title: string; message: string };
}
