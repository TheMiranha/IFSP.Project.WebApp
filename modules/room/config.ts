import { IRoomOutputs } from "./domain/room.outputs";
import { CSRRoom } from "./infrastructure/CSRRoom";
import { SSRRoom } from "./infrastructure/SSRRoom";

type roomOutputs = {
  SSR: IRoomOutputs,
  CSR: IRoomOutputs
}

export const roomOutputs: roomOutputs = {
  SSR: new SSRRoom(),
  CSR: new CSRRoom()
}

export const roomModuleConfig = {
  roomOutputs
}