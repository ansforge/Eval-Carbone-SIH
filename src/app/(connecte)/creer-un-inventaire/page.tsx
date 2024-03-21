import { Metadata } from 'next'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import CreerUnInventaire from '../../../components/CreerUnInventaire/CreerUnInventaire'

const title = 'Créer un inventaire'
export const metadata: Metadata = {
  title,
}

export default async function Page(): Promise<ReactElement> {
  const profile = await getProfileAtih()

  return (
    <>
      <Breadcrumb label={title} />
      <CreerUnInventaire nomEtablissement={profile.nomEtablissement} />
    </>
  )
}
