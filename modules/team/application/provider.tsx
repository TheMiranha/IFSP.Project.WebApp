'use client'

import { useRoom } from "@/modules/room/application/store/room"
import { useCallback, useEffect } from "react"
import { useTeam } from "./store/team"
import { getUserTeams } from "../domain/team.actions"
import { CreateTeamDialog } from "./create-team-dialog"

export const TeamModuleProvider = () => {

  const { currentRoom } = useRoom()
  const { setTeams, setLoading, resetStore } = useTeam()

  const loadTeams = useCallback(async () => {
    if (!currentRoom) return
    setLoading(true)

    const response = await getUserTeams({ roomId: currentRoom?.room.id })

    setTeams(response.teams)

    setLoading(false)
  }, [setLoading, currentRoom, setTeams])

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