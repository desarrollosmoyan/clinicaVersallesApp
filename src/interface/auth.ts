import {UsersPermissionsMe} from '@generated/graphql';

export interface StateProps {
  isLoading: boolean;
  isAuth: boolean;
  infoUser: {
    token: string;
    user: UsersPermissionsMe;
  };
}
