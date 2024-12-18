import { create } from 'zustand';

interface AppState {
  selectedClient: string | null;
  selectedCreator: string | null;
  setSelectedClient: (clientId: string | null) => void;
  setSelectedCreator: (creatorId: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  selectedClient: null,
  selectedCreator: null,
  setSelectedClient: (clientId) => set({ selectedClient: clientId }),
  setSelectedCreator: (creatorId) => set({ selectedCreator: creatorId }),
}));