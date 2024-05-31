import { db } from "@/lib/db";
import { CreateRoom, DisableShareCodeRoom, EnterRoom, GetUserRoom, GetUserRooms, IRoomOutputs, RegenerateRoomShareCode } from "../domain/room.outputs";
import { currentAccount, getAuthData } from "@/modules/auth/domain/auth.actions";
import { ProfileRoom } from "@prisma/client";
import { WithProfile } from "../domain/types";
import { generateShareCode } from "../utils";

export class SSRRoom implements IRoomOutputs {

  async getUserRooms(): Promise<GetUserRooms['response']> {

    const { profileId } = await currentAccount()

    const rooms = await db.room.findMany({
      where: {
        profilesRoom: {
          some: {
            profileId: profileId
          }
        },
      },
      include: {
        profilesRoom: {
          include: {
            profile: true
          }
        }
      }
    })

    const response: GetUserRooms['response']['rooms'] = []
    for (let roomIndex = 0; roomIndex < rooms.length; roomIndex++) {
      const roomObject = { ...rooms[roomIndex] }
      const profileRoom = await db.profileRoom.findFirst({
        where: {
          roomId: roomObject.id,
          profileId: profileId
        }
      })

      for (let profileRoomIndex = 0; profileRoomIndex < roomObject.profilesRoom.length; profileRoomIndex++) {
        const profileObject = roomObject.profilesRoom[profileRoomIndex].profile
        const profileData = await getAuthData({ clerkId: profileObject.clerkId })
        if (profileData.authData) {
          Object.assign(profileObject, { authData: profileData.authData })
        }
      }

      if (profileRoom) {
        response.push({ profileRoom, room: (roomObject as GetUserRooms['response']['rooms'][number]['room']) })
      }
    }

    return { rooms: response }
  }

  async getUserRoom(props: GetUserRoom['props']): Promise<GetUserRoom['response']> {

    const { profileId } = await currentAccount()

    const room = await db.room.findFirst({
      where: {
        id: props.roomId,
        profilesRoom: {
          some: {
            profileId: profileId
          }
        },
      },
      include: {
        profilesRoom: {
          include: {
            profile: true
          }
        }
      }
    })

    if (!room) return { room: undefined }

    let response: GetUserRoom['response']['room'] = undefined
    const roomObject = { ...room }
    const profileRoom = await db.profileRoom.findFirst({
      where: {
        roomId: roomObject.id,
        profileId: profileId
      }
    })

    for (let profileRoomIndex = 0; profileRoomIndex < roomObject.profilesRoom.length; profileRoomIndex++) {
      const profileObject = roomObject.profilesRoom[profileRoomIndex].profile
      const profileData = await getAuthData({ clerkId: profileObject.clerkId })
      if (profileData.authData) {
        Object.assign(profileObject, { authData: profileData.authData })
      }
    }

    if (profileRoom) {
      response = { profileRoom, room: (roomObject as GetUserRooms['response']['rooms'][number]['room']) }
    }

    return { room: response }
  }

  async createRoom({ description, iconName, name }: CreateRoom['props']): Promise<CreateRoom['response']> {

    const { profileId, clerkId } = await currentAccount()

    const createdRoom = await db.room.create({
      data: {
        name,
        description,
        iconName,
        shareCode: generateShareCode()
      }
    })

    if (!createdRoom) throw new Error('Fail on create room')

    const profileRoom = await db.profileRoom.create({
      data: {
        role: 'OWNER',
        wallet: 0,
        profileId: profileId,
        roomId: createdRoom.id,
      }
    })

    if (!profileRoom) {
      await db.room.delete({ where: { id: createdRoom.id } })
      throw new Error('Fail on create profileRoom')
    }

    const returnedProfileRoom = (await db.profileRoom.findFirst({ where: { id: profileRoom.id }, include: { profile: true } })) as WithProfile<ProfileRoom>
    const authDataResponse = await getAuthData({ clerkId })
    Object.assign(returnedProfileRoom.profile, { authData: authDataResponse.authData })

    return {
      success: true,
      room: {
        room: {
          ...createdRoom,
          profilesRoom: [returnedProfileRoom]
        },
        profileRoom
      },
    }
  }

  async regenerateRoomShareCode(props: RegenerateRoomShareCode["props"]): Promise<RegenerateRoomShareCode['response']> {
    const { roomId } = props
    const { profileId } = await currentAccount()
    const profileRoom = await db.profileRoom.findFirst({
      where: {
        roomId,
        profileId
      }
    })

    if (!profileRoom) {
      return {
        success: false,
        errorMessage: 'Você não está nesta sala.'
      }
    }
    if (profileRoom.role != 'OWNER') {
      return {
        success: false,
        errorMessage: 'Você não possui permissões para isto.'
      }
    }

    const newShareCode = generateShareCode()
    await db.room.update({
      where: {
        id: roomId
      },
      data: {
        shareCode: newShareCode
      }
    })

    return {
      success: true,
      shareCode: newShareCode
    }

  }

  async enterRoom(props: EnterRoom['props']): Promise<EnterRoom['response']> {

    const { shareCode } = props
    const { profileId } = await currentAccount()

    const roomByShareCode = await db.room.findFirst({ where: { shareCode }, include: { teams: true } })
    if (!roomByShareCode) {
      return { success: false, errorMessage: 'Nenhuma turma com este código foi encontrada.' };
    }

    if (roomByShareCode.disableShareCode) {
      return { success: false, errorMessage: 'Nenhuma turma com este código foi encontrada.' };
    }

    const alreadyJoined = await db.profileRoom.findFirst({ where: { roomId: roomByShareCode.id, profileId } })
    if (alreadyJoined) {
      return { success: false, errorMessage: 'Você já está nesta turma.' }
    }

    const profileRoom = await db.profileRoom.create({
      data: {
        role: 'MEMBER',
        wallet: 0,
        profileId,
        roomId: roomByShareCode.id
      }
    })

    if (!profileRoom) {
      return { success: false, errorMessage: 'Ocorreu um erro.' }
    }

    const complexRoom = await this.getUserRoom({ roomId: roomByShareCode.id })

    return {
      success: !!complexRoom,
      ...complexRoom,
      errorMessage: !complexRoom ? 'Não foi possível atualizar suas turmas.' : undefined
    }
  }

  async disableShareCodeRoom(props: DisableShareCodeRoom['props']): Promise<DisableShareCodeRoom['response']> {

    const { disableShareCode, roomId } = props
    const { profileId } = await currentAccount()

    const room = await db.room.findUnique({ where: { id: roomId } })
    if (!room) {
      return {
        success: false,
        errorMessage: 'Turma não encontrada'
      }
    }

    const teamProfile = await db.profileRoom.findFirst({
      where: {
        profileId,
      }
    })

    if (!teamProfile) {
      return {
        success: false,
        errorMessage: 'Você não faz parte dessa turma!'
      }
    }

    if (teamProfile.role != 'OWNER') {
      return {
        success: false,
        errorMessage: 'Você não tem permissões o suficiente.'
      }
    }

    await db.room.update({
      data: {
        disableShareCode
      },
      where: {
        id: roomId
      }
    })

    return {
      success: true
    }
  }

}