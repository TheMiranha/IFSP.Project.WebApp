import { db } from "@/lib/db";
import { CreateRoom, GetUserRooms, IRoomOutputs } from "../domain/room.outputs";
import { currentAccount, getAuthData } from "@/modules/auth/domain/auth.actions";

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

  async createRoom({ description, iconName, name }: CreateRoom['props']): Promise<CreateRoom['response']> {

    const { profileId } = await currentAccount()

    function generateMeetingRoomInvitationString() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let invitationString = '';

      for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        invitationString += chars.charAt(randomIndex);
      }

      return invitationString;
    }

    const createdRoom = await db.room.create({
      data: {
        name,
        description,
        iconName,
        shareCode: generateMeetingRoomInvitationString()
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

    return {
      success: true,
      profileRoom,
      room: createdRoom,
    }

  }

}