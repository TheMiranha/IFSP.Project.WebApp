import { isClientSide } from "@/lib/utils"
import { CreateTeam, GetUserTeams } from "./team.outputs"
import { teamOutputs } from "../config"

export async function getUserTeams(props: GetUserTeams['props']): Promise<GetUserTeams['response']> {
  const localTeamOutputs = isClientSide() ? teamOutputs.CSR : teamOutputs.SSR
  try {
    return localTeamOutputs.getUserTeams(props)
  } catch (error: any) {
    throw Error(error)
  }
}

export async function createTeam(props: CreateTeam['props']): Promise<CreateTeam['response']> {
  const localTeamOutputs = isClientSide() ? teamOutputs.CSR : teamOutputs.SSR
  try {
    return localTeamOutputs.createTeam(props)
  } catch (error: any) {
    throw Error(error)
  }
}