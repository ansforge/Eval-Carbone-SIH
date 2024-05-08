import { Metadata } from 'next'
import { getProviders } from 'next-auth/react'
import { ReactElement } from 'react'

import { checkIfConnected } from '../../../authentification'
import Connexion from '../../../components/Connexion/Connexion'

export const metadata: Metadata = {
  title: 'Se connecter à EvalCarboneSIH',
}

export default async function PageConnexion(): Promise<ReactElement> {
  await checkIfConnected()

  const providers = await getProviders()

  return (
    <Connexion
      providers={providers}
    />
  )
}
