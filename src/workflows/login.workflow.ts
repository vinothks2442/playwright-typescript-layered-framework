import { LoginPage } from '../pages/login.page';
import { users } from '../test-data/users';

export class LoginWorkflow {
  constructor(private readonly loginPage: LoginPage) {}

  async loginAsStandardUser(): Promise<void> {
    await this.loginPage.open();

    await this.loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );
  }

  async loginAsLockedOutUser(): Promise<void> {
    await this.loginPage.open();

    await this.loginPage.login(
      users.lockedOutUser.username,
      users.lockedOutUser.password
    );
  }
}