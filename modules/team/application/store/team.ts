import { create } from "zustand"
import { ComplexTeam } from "../../domain/types"

type StoreValues = {
  loading: boolean
  teams: ComplexTeam[]
  currentTeam: ComplexTeam | null
  openCreateTeamDialog: boolean
}

type StoreFunctions = {
  setLoading: (e: StoreValues['loading']) => void
  setTeams: (e: StoreValues['teams']) => void
  setCurrentTeam: (e: StoreValues['currentTeam']) => void
  resetStore: () => void
  setOpenCreateTeamDialog: (e: StoreValues['openCreateTeamDialog']) => void,
  addTeam: (e: ComplexTeam) => void
}

type Store = StoreValues & StoreFunctions

const initialStore: StoreValues = {
  loading: true,
  teams: [],
  currentTeam: null,
  openCreateTeamDialog: false
}

export const useTeam = create<Store>((set) => ({
  ...initialStore,
  setLoading: e => set({ loading: e }),
  setTeams: e => set({ teams: e }),
  setCurrentTeam: e => set({ currentTeam: e }),
  setOpenCreateTeamDialog: e => set({ openCreateTeamDialog: e }),
  addTeam: e => set(prev => ({ ...prev, teams: [...prev.teams, e] })),
  resetStore: () => set(initialStore),
}))