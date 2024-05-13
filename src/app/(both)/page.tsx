import { Metadata } from 'next'
import { ReactElement } from 'react'

import { getProfilAtih } from '../../authentification'
import Accueil from '../../components/Accueil/Accueil'

export const metadata: Metadata = {
  title: 'Accueil',
}

export default async function PageAccueil(): Promise<ReactElement> {
  const profil = await getProfilAtih()

  return (
    <Accueil
      isAdmin={profil.isAdmin}
      isConnected={profil.isConnected}
    />
  )
}
