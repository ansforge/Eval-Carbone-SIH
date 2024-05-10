import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfilAtih } from '../../../../authentification'
import DupliquerUnInventaire from '../../../../components/DupliquerUnInventaire/DupliquerUnInventaire'
import Breadcrumb from '../../../../components/sharedComponents/Breadcrumb'

const title = 'Dupliquer un inventaire'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams?: Readonly<{
    nomInventaire?: string
  }>
}>

export default async function PageDupliquerUnInventaire({ searchParams }: PageProps): Promise<ReactElement> {
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
      <DupliquerUnInventaire
        ancienNomInventaire={searchParams.nomInventaire}
        nomEtablissement={profil.nomEtablissement}
      />
    </>
  )
}
