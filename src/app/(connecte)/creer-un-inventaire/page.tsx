import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfilAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import CreerUnInventaire from '../../../components/CreerUnInventaire/CreerUnInventaire'

const title = 'Créer un inventaire'
export const metadata: Metadata = {
  title,
}

export default async function Page(): Promise<ReactElement> {
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
