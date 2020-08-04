import { User } from './user';

export interface Auth {
  user: User | {};
  isAuthenticated: boolean;
  isLoggingIn: boolean;
}
