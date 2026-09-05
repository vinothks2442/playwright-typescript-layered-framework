import { UserFactory } from './user.factory';

export const users = {
  standardUser: UserFactory.createStandardUser(),
  lockedOutUser: UserFactory.createLockedOutUser(),
} as const;