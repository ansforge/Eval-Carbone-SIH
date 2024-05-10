import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfilAtih } from '../../../../authentification'
import CreerUnInventaire from '../../../../components/CreerUnInventaire/CreerUnInventaire'
import Breadcrumb from '../../../../components/sharedComponents/Breadcrumb'

const title = 'Créer un inventaire'
export const metadata: Metadata = {
  title,
}

export default async function PageCreerUnInventaire(): Promise<ReactElement> {
  const profil = await getProfilAtih()

  if (profil.isAdmin) {
    notFound()
  }

  return (
    <>
      <Breadcrumb label={title} />
      <CreerUnInventaire nomEtablissement={profil.nomEtablissement} />
    </>
  )
}
