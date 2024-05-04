import { Metadata } from 'next'
import { getProviders } from 'next-auth/react'
import { ReactElement } from 'react'

import { isConnected } from '../../../authentification'
import Connexion from '../../../components/Connexion/Connexion'

export const metadata: Metadata = {
  title: 'Se connecter à EvalCarboneSIH',
}

export default async function PageConnexion(): Promise<ReactElement> {
  await isConnected()

  const providers = await getProviders()

  return (
    <Connexion
      providers={providers}
    />
  )
}
