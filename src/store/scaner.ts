import {create} from 'zustand';

interface ScannerrState {
  data: any;
  scannerData: (data: any) => void;
}

export const useScannerStore = create<ScannerrState>()(set => ({
  data: [],
  scannerData: value => set(() => ({data: value})),
}));
