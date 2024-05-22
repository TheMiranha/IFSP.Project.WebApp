import { CSRTeam } from "./infrastructure/CSRTeam";
import { SSRTeam } from "./infrastructure/SSRTeam";

export const teamOutputs = {
  SSR: new SSRTeam(),
  CSR: new CSRTeam()
}

export const teamModuleConfig = {
  teamOutputs
}