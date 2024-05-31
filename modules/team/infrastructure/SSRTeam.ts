import { currentAccount, getAuthData } from "@/modules/auth/domain/auth.actions";
import { CreateTeam, GetUserTeams, ITeamOutputs } from "../domain/team.outputs";
import { db } from "@/lib/db";
import { ProfileRoom } from "@prisma/client";

function log(fnName: string, str: string) {
  console.log('[SSRTeam][' + fnName + ']: ' + str)
}

export class SSRTeam implements ITeamOutputs {

  async getUserTeams({ roomId }: GetUserTeams['props']): Promise<GetUserTeams['response']> {

    const { profileId } = await currentAccount()

    const teams = await db.team.findMany({
      where: {
        OR: [
          {
            members: {
              some: {
                profileRoom: {
                  profileId: profileId
                }
              }
            },
          },
          {
            room: {
              profilesRoom: {
                some: {
                  profileId,
                  role: 'OWNER'
                }
              }
            }
          }
        ],
        roomId,
      },
      include: {
        members: {
          include: {
            profileRoom: {
              include: {
                profile: true
              }
            }
          }
        },
      },
    })

    for (let teamIndex = 0; teamIndex < teams.length; teamIndex++) {
      const teamObject = teams[teamIndex]
      for (let memberIndex = 0; memberIndex < teamObject.members.length; memberIndex++) {
        const memberObject = teamObject.members[memberIndex]
        const authResponse = await getAuthData({ clerkId: memberObject.profileRoom.profile.clerkId })
        if (authResponse.authData) {
          Object.assign(memberObject.profileRoom.profile, { authData: authResponse.authData })
        }
      }
    }

    return ({
      success: true,
      teams
    }) as GetUserTeams['response']
  }

  async createTeam({ roomId, name, description, iconName, leaderId }: CreateTeam['props']): Promise<CreateTeam['response']> {

    // criar team
    const teamAlreadyExists = await db.team.findFirst({ where: { name, roomId } })
    if (teamAlreadyExists) {
      return {
        success: false,
        errorMessage: 'Já existe uma equipe com este nome.'
      }
    }

    const createdTeam = await db.team.create({
      data: {
        name,
        description,
        iconName,
        roomId
      }
    })

    if (!createdTeam) {
      log('CreateTeam', 'ORM cant create team.')
      return {
        success: false,
        errorMessage: 'Não foi possível gerar a equipe.'
      }
    }

    const createdTeamProfile = await db.teamProfile.create({
      data: {
        role: "LEADER",
        teamId: createdTeam.id,
        profileRoomId: leaderId
      }
    })

    if (!createdTeamProfile) {
      await db.team.delete({ where: { id: createdTeam.id } })
      log('CreateTeam', 'ORM cant create teamProfile.')
      return {
        success: false,
        errorMessage: 'Não foi possível gerar a equipe.'
      }
    }

    const leaderProfileRoom = (await db.profileRoom.findFirst({ where: { id: leaderId }, include: { profile: true } })) as ProfileRoom

    // @ts-ignore
    createdTeamProfile.profileRoom = leaderProfileRoom
    // @ts-ignore
    const leaderAuthData = await getAuthData({ clerkId: leaderProfileRoom?.profile.clerkId })
    // @ts-ignore
    Object.assign(createdTeamProfile.profileRoom.profile, leaderAuthData)

    const createdTeamWithProfile = { ...createdTeam, members: [createdTeamProfile] }

    return {
      success: true,
      createdTeam: createdTeamWithProfile
    } as CreateTeam['response']

  }

}