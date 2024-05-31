import { CreateRoom, DisableShareCodeRoom, EnterRoom, GetUserRoom, GetUserRooms, IRoomOutputs, RegenerateRoomShareCode } from "../domain/room.outputs";

export class CSRRoom implements IRoomOutputs {

  async getUserRooms(): Promise<GetUserRooms['response']> {
    const response = await fetch('/api/rooms', {
      method: 'GET'
    }).then(res => res.json())

    return response
  }

  async getUserRoom(props: GetUserRoom['props']): Promise<GetUserRoom['response']> {
    const response = await fetch('/api/room?roomId=' + props.roomId, {
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

  async regenerateRoomShareCode(props: RegenerateRoomShareCode['props']): Promise<RegenerateRoomShareCode['response']> {
    const response = await fetch('/api/rooms/regenerate-share-code', {
      method: 'post',
      body: JSON.stringify(props)
    }).then(res => res.json())

    return response
  }

  async enterRoom(props: EnterRoom['props']): Promise<EnterRoom['response']> {
    const response = await fetch('/api/rooms/enter-room', {
      method: 'post',
      body: JSON.stringify(props)
    }).then(res => res.json())

    return response
  }

  async disableShareCodeRoom(props: DisableShareCodeRoom['props']): Promise<DisableShareCodeRoom['response']> {
    const response = await fetch('/api/rooms/disable-share-code', {
      method: 'post',
      body: JSON.stringify(props)
    }).then(res => res.json())

    return response
  }

}