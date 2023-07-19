import {create} from 'zustand';
import {UsersPermissionsLoginPayload} from '../generated/graphql';

interface SessionState {
  session: UsersPermissionsLoginPayload | null;
  sessionUpdate: (value: UsersPermissionsLoginPayload) => void;
}

export const useSessionStore = create<SessionState>()(set => ({
  session: null,
  sessionUpdate: value => set(() => ({session: value})),
}));
