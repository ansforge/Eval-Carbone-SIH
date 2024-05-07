import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfilAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import CreerUneSimulation from '../../../components/CreerUneSimulation/CreerUneSimulation'

const title = 'Créer une simulation'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams?: Readonly<{
    nomInventaire?: string
  }>
}>

export default async function PageCreerUneSimulation({ searchParams }: PageProps): Promise<ReactElement> {
  if (searchParams?.nomInventaire === undefined) {
    notFound()
  }

  const profil = await getProfilAtih()

  if (profil.isAdmin) {
    notFound()
  }

  return (
    <>
      <Breadcrumb label={title} />
      <CreerUneSimulation
        ancienNomInventaire={searchParams.nomInventaire}
        nomEtablissement={profil.nomEtablissement}
      />
    </>
  )
}
