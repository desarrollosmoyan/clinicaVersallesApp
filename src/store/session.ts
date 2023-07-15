import {create} from 'zustand';
import {UsersPermissionsLoginPayload} from '../generated/graphql';

interface SessionState {
  session: UsersPermissionsLoginPayload;
}
export const useSessionStore = create<SessionState>()(set => ({
  session: {
    user: {
      __typename: undefined,
      blocked: undefined,
      confirmed: undefined,
      email: undefined,
      id: '',
      role: undefined,
      username: '',
    },
  },
  modalEstacionUpdate: value => set(() => ({modalEstacion: value})),
}));
