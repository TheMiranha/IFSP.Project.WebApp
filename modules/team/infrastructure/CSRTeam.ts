import { CreateTeam, GetUserTeams, ITeamOutputs } from "../domain/team.outputs";

export class CSRTeam implements ITeamOutputs {

  async getUserTeams({ roomId }: GetUserTeams['props']): Promise<GetUserTeams['response']> {

    const response = await fetch('/api/teams?roomId=' + roomId).then(res => res.json())

    return response
  }

  async createTeam(teamProps: CreateTeam['props']): Promise<CreateTeam['response']> {

    const response = await fetch('/api/team/create', {
      method: 'POST',
      body: JSON.stringify(teamProps)
    }).then(res => res.json())

    return response

  }

}