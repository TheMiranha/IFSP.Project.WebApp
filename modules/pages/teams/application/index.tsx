'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRoom } from "@/modules/room/application/store/room";
import { useTeam } from "@/modules/team/application/store/team";
import { PlusIcon } from "lucide-react";
import { TeamCard } from "./team-card";

export function TeamPage() {

  const { teams, setOpenCreateTeamDialog } = useTeam()
  const { currentRoom } = useRoom()

  return (
    <div>
      <Label className='text-lg flex items-center gap-2'>
        {currentRoom?.profileRoom.role != "MEMBER" ? 'Equipes' : 'Suas equipes'}
        {
          currentRoom?.profileRoom.role != 'MEMBER' && (
            <Button size='icon' variant='outline' onClick={() => setOpenCreateTeamDialog(true)}>
              <PlusIcon />
            </Button>
          )
        }
      </Label>
      <div className='flex flex-col md:flex-row flex-wrap items-center gap-4 mt-4'>
        {
          teams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))
        }
      </div>
    </div>
  )
}
