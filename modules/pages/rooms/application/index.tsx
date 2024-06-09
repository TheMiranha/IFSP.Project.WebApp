import { PageContainer } from "@/components/ui/page-container";
import dynamic from "next/dynamic";

const OnlyClientRoomsTable = dynamic(() => import('./rooms-table').then(file => file.OnlyClientRoomsTable), {
  ssr: false,
  loading: () => <></>
})

export function RoomsPage() {

  return (
    <PageContainer title='Turmas'>
      <OnlyClientRoomsTable />
    </PageContainer>
  )
}