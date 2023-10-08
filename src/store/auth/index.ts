import {create} from 'zustand';
import {GetUserByIdQuery, UsersPermissionsMe} from '../../generated/graphql';

type UserAuth = UsersPermissionsMe;
type UserInfo = GetUserByIdQuery['usersPermissionsUser'];

interface State {
  token: string;
  isAuth: boolean;
  isLoading: boolean;
  userAuth: UserAuth | null;
  userInfo: UserInfo | null;
}

interface Action {
  logoutAction: () => void;
  setUserInfo: (data: UserInfo) => void;
  loginAction: (data: {userAuth: UserAuth; token: string}) => void;
}

const initalState: State = {
  token: '',
  userAuth: null,
  userInfo: null,
  isAuth: false,
  isLoading: true,
};

export const useAuthStore = create<State & Action>()(set => ({
  ...initalState,
  setUserInfo: userInfo => {
    set({userInfo});
  },
  loginAction: ({userAuth, token}) => {
    set({isAuth: true, isLoading: false, userAuth, token});
  },
  logoutAction: () => {
    set({...initalState, isLoading: false});
  },
}));
