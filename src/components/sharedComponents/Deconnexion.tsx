'use client'

import { signOut } from 'next-auth/react'
import { ReactElement } from 'react'

export default function Deconnexion(): ReactElement {
  return (
    <button
      className="nav-link"
      onClick={async () => signOut()}
      type="button"
    >
      Se déconnecter
    </button>
  )
}
