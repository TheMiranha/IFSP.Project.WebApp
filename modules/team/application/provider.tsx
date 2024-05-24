'use client'

import { useRoom } from "@/modules/room/application/store/room"
import { useCallback, useEffect } from "react"
import { useTeam } from "./store/team"
import { getUserTeams } from "../domain/team.actions"
import { CreateTeamDialog } from "./create-team-dialog"
import { useLoading } from "@/modules/loading/application/store/loading"

export const TeamModuleProvider = () => {

  const { currentRoom } = useRoom()
  const { setTeams, resetStore } = useTeam()
  const { setActive } = useLoading()

  const loadTeams = useCallback(async () => {
    if (!currentRoom) return
    setActive(true)

    const response = await getUserTeams({ roomId: currentRoom?.room.id })

    setTeams(response.teams)

    setActive(false)
  }, [setActive, currentRoom, setTeams])

  useEffect(() => {
    resetStore()
    if (currentRoom != null) {
      loadTeams()
    }
  }, [currentRoom, resetStore, loadTeams])

  return (
    <>
      <CreateTeamDialog />
    </>
  )
}