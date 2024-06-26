import { ClientSafeProvider, getProviders } from 'next-auth/react'
import { PropsWithChildren, ReactElement } from 'react'

import { getProfilAtih } from '../../authentification'
import AccesRapide from '../../components/sharedComponents/AccesRapide'
import EnTete from '../../components/sharedComponents/EnTete'
import PiedDePage from '../../components/sharedComponents/PiedDePage'

export default async function Layout({ children }: PropsWithChildren): Promise<ReactElement> {
  return (
    <>
      <AccesRapide />
      <EnTete
        profil={await getProfilAtih()}
        providers={await getProviders() as Record<'pasrel', ClientSafeProvider>}
      />
      <main
        className="main pt-4"
        id="main"
        tabIndex={-1}
      >
        <div className="container">
          {children}
        </div>
      </main>
      <PiedDePage />
    </>
  )
}
