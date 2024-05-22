import { CSRAuthentication } from "./infrastructure/CSRAuthentication";
import { SSRAuthentication } from "./infrastructure/SSRAuthentication";

export const authOutputs = {
  SSR: new SSRAuthentication(),
  CSR: new CSRAuthentication()
}

export const authModuleConfig = {
  outputs: authOutputs
}