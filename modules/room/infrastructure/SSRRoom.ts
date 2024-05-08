import { db } from "@/lib/db";
import { CreateRoom, GetUserRooms, IRoomOutputs } from "../domain/room.outputs";
import { currentAccount } from "@/modules/auth/domain/auth.actions";

export class SSRRoom implements IRoomOutputs {

  async getUserRooms(): Promise<GetUserRooms['response']> {

    const { profileId } = await currentAccount()

    const rooms = await db.room.findMany({
      where: {
        profilesRoom: {
          some: {
            profileId: profileId
          }
        }
      }
    })

    const response: GetUserRooms['response']['rooms'] = []
    for (let roomIndex = 0; roomIndex < rooms.length; roomIndex++) {
      const profileRoom = await db.profileRoom.findFirst({
        where: {
          roomId: rooms[roomIndex].id,
          profileId: profileId
        }
      })
      if (profileRoom) {
        response.push({ profileRoom, room: rooms[roomIndex] })
      }
    }


    return { rooms: response }
  }

  async createRoom({ description, iconName, name }: CreateRoom['props']): Promise<CreateRoom['response']> {

    const { profileId } = await currentAccount()

    const createdRoom = await db.room.create({
      data: {
        name,
        description,
        iconName,
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