import { User } from './user.interface';
export interface AuthLogin {
  user?: User;
  accessToken?: string;
  authenticated?: boolean;
}
