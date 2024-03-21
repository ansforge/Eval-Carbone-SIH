import { PropsWithChildren, ReactElement } from 'react'

import AccesRapide from '../../components/commun/AccesRapide'
import EnTete from '../../components/commun/EnTete'
import PiedDePage from '../../components/commun/PiedDePage'

export default function Layout({ children }: PropsWithChildren): ReactElement {
  return (
    <>
      <AccesRapide />
      <EnTete />
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
