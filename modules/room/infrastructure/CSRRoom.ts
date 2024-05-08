import { CreateRoom, GetUserRooms, IRoomOutputs } from "../domain/room.outputs";

export class CSRRoom implements IRoomOutputs {

  async getUserRooms(): Promise<GetUserRooms['response']> {
    const response = await fetch('/api/rooms', {
      method: 'GET'
    }).then(res => res.json())

    return response
  }

  async createRoom(props: CreateRoom['props']): Promise<CreateRoom['response']> {
    const response = await fetch('/api/rooms/create', {
      method: 'post',
      body: JSON.stringify(props)
    }).then(res => res.json())

    return response
  }

}