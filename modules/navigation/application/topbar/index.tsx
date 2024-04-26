import { TopbarCenter } from "./center";
import { TopbarLeft } from "./left";
import { TopbarRight } from "./right";

export function Topbar() {
  return (
    <div className='flex h-12 border-b px-4'>
      <TopbarLeft />
      <TopbarCenter />
      <TopbarRight />
    </div>
  )
}