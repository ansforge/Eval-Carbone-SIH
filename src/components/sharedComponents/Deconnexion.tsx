'use client'

import { signOut } from 'next-auth/react'
import { ReactElement } from 'react'

export default function Deconnexion(): ReactElement {
  return (
    <button
      className="nav-link"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={async () => signOut()}
      type="button"
    >
      Se déconnecter
    </button>
  )
}
