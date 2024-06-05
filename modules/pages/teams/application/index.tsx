'use client'

import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRoom } from "@/modules/room/application/store/room";
import { useTeam } from "@/modules/team/application/store/team";
import { getNameByAuthUser } from "@/modules/user/application/utils";
import moment from "moment";

export function TeamPage() {

  const { teams, setOpenCreateTeamDialog } = useTeam()
  const { currentRoom } = useRoom()

  return (
    <PageContainer title='Equipes'>
      {currentRoom?.profileRoom.role != "MEMBER" && (
        <Button onClick={() => setOpenCreateTeamDialog(true)}>
          botão temporário para adicionar equipe
        </Button>
      )}
      <Table>
        <TableCaption>Lista de equipes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Líder</TableHead>
            <TableHead className='text-right'>Participantes</TableHead>
            <TableHead className='text-right'>Criado em</TableHead>
            <TableHead className='text-right'>Atualizado em</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            teams.map(team => (
              <TableRow key={team.id}>
                <TableCell>{team.id}</TableCell>
                <TableCell>{team.name}</TableCell>
                <TableCell>
                  {getNameByAuthUser(team.members.find(member => member.role === 'LEADER')?.profileRoom.profile.authData)}
                </TableCell>
                <TableCell className='text-right'>{team.members.length}</TableCell>
                <TableCell className='text-right'>{moment(team.createdAt).format('DD/MM/YYYY HH:mm')}</TableCell>
                <TableCell className='text-right'>{moment(team.updatedAt).format('DD/MM/YYYY HH:mm')}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </PageContainer>
  )
}
