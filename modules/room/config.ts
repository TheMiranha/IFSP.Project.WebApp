import { CSRRoom } from "./infrastructure/CSRRoom";
import { SSRRoom } from "./infrastructure/SSRRoom";

export const roomOutputs = {
  SSR: new SSRRoom(),
  CSR: new CSRRoom()
}

export const roomModuleConfig = {
  roomOutputs
}