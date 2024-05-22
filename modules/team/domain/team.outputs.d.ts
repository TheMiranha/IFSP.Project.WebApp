import { Team } from "@prisma/client"
import { ComplexTeam } from "./types"

export type GetUserTeams = {
  props: {
    roomId: string
  },
  response: {
    success: boolean
    teams: ComplexTeam[]
  }
}

export type CreateTeam = {
  props: {
    name: string
    description: string
    iconName: string
    leaderId: string
    roomId: string
  },
  response: {
    success: boolean
    errorMessage?: string
    createdTeam?: ComplexTeam
  }
}

export interface ITeamOutputs {
  getUserTeams(props: GetUserTeams['props']): Promise<GetUserTeams['response']>
  createTeam(props: CreateTeam['props']): Promise<CreateTeam['response']>
}