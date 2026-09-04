import { User } from '../models/user.model';

export class UserFactory {
  static createStandardUser(): User {
    return {
      username: 'standard_user',
      password: 'secret_sauce',
    };
  }

  static createLockedOutUser(): User {
    return {
      username: 'locked_out_user',
      password: 'secret_sauce',
    };
  }
}