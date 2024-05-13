import { Metadata } from 'next'
import { ClientSafeProvider, getProviders } from 'next-auth/react'
import { ReactElement } from 'react'

import { getProfilAtih } from '../../authentification'
import Accueil from '../../components/Accueil/Accueil'

export const metadata: Metadata = {
  title: 'Accueil',
}

export default async function PageAccueil(): Promise<ReactElement> {
  const profil = await getProfilAtih()

  let providers = undefined
  if (!profil.isConnected) {
    providers = await getProviders() as Record<'pasrel', ClientSafeProvider>
  }

  return (
    <Accueil
      isAdmin={profil.isAdmin}
      isConnected={profil.isConnected}
      providers={providers}
    />
  )
}
