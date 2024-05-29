'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoom } from "@/modules/room/application/store/room";
import { getNameByAuthUser } from "@/modules/user/application/utils";
import { Share2Icon } from "lucide-react";
import { RoomMemberCard } from "./room-member-card";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

export function RoomMembersPage() {

  const { currentRoom, setOpenShareRoomDialog } = useRoom()
  const [searchValue, setSearchValue] = useState('')

  const filteredMembers = useMemo(() => {
    if (!currentRoom) return []
    return currentRoom?.room.profilesRoom.filter(profile => {
      return getNameByAuthUser(profile.profile.authData).toLowerCase().includes(searchValue.toLowerCase())
    })
  }, [currentRoom, searchValue])

  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-2'>
        Membros da turma
      </div>
      <div className='flex items-center gap-2'>
        <Button size='icon' variant='outline' onClick={() => setOpenShareRoomDialog(true)}>
          <Share2Icon className='w-4 h-4' />
        </Button>
        <Input
          className='w-[350px] max-w-[98dvw]'
          placeholder="Pesquisar membros"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </div>
      <div className='flex gap-4 flex-wrap'>
        {
          filteredMembers.map(profile => (
            <RoomMemberCard profile={profile} key={profile.id} />
          ))
        }
      </div>
    </div>
  )
}