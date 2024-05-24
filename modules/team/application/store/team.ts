import { create } from "zustand"
import { ComplexTeam } from "../../domain/types"

type StoreValues = {
  teams: ComplexTeam[]
  currentTeam: ComplexTeam | null
  openCreateTeamDialog: boolean
}

type StoreFunctions = {
  setTeams: (e: StoreValues['teams']) => void
  setCurrentTeam: (e: StoreValues['currentTeam']) => void
  resetStore: () => void
  setOpenCreateTeamDialog: (e: StoreValues['openCreateTeamDialog']) => void,
  addTeam: (e: ComplexTeam) => void
}

type Store = StoreValues & StoreFunctions

const initialStore: StoreValues = {
  teams: [],
  currentTeam: null,
  openCreateTeamDialog: false
}

export const useTeam = create<Store>((set) => ({
  ...initialStore,
  setTeams: e => set({ teams: e }),
  setCurrentTeam: e => set({ currentTeam: e }),
  setOpenCreateTeamDialog: e => set({ openCreateTeamDialog: e }),
  addTeam: e => set(prev => ({ ...prev, teams: [...prev.teams, e] })),
  resetStore: () => set(initialStore),
}))