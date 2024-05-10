import { PropsWithChildren, ReactElement } from 'react'

import { getProfilAtih, checkIfNotConnected } from '../../authentification'
import AccesRapide from '../../components/sharedComponents/AccesRapide'
import EnTete from '../../components/sharedComponents/EnTete'
import PiedDePage from '../../components/sharedComponents/PiedDePage'

export default async function Layout({ children }: PropsWithChildren): Promise<ReactElement> {
  await checkIfNotConnected()

  return (
    <>
      <AccesRapide />
      <EnTete profil={await getProfilAtih()} />
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
