import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfilAtih } from '../../../../authentification'
import CreerUneSimulation from '../../../../components/CreerUneSimulation/CreerUneSimulation'
import Breadcrumb from '../../../../components/sharedComponents/Breadcrumb'

const title = 'Créer une simulation'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams: Promise<Readonly<{
    nomInventaire?: string
  }>>
}>

export default async function PageCreerUneSimulation({ searchParams: searchParamsPromise }: PageProps): Promise<ReactElement> {
  const searchParams = await searchParamsPromise
  if (searchParams.nomInventaire === undefined) {
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
