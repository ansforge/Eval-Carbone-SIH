import { PropsWithChildren, ReactElement } from 'react'

import { getProfileAtih } from '../../authentification'
import AccesRapide from '../../components/commun/AccesRapide'
import EnTete from '../../components/commun/EnTete'
import PiedDePage from '../../components/commun/PiedDePage'

export default async function Layout({ children }: PropsWithChildren): Promise<ReactElement> {
  const session = await getProfileAtih()

  return (
    <>
      <AccesRapide />
      <EnTete session={session} />
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
