import {create} from 'zustand';

interface ActionProps {
  isOnline: boolean;
  updateIsOnline: (value: boolean) => void;
}

export const useOnlineStore = create<ActionProps>()(set => ({
  isOnline: false,
  updateIsOnline: value => set(() => ({isOnline: value})),
}));
