'use client'

import { ClientSafeProvider, signIn } from 'next-auth/react'
import { ReactElement } from 'react'

type ConnexionProps = Readonly<{
  providers: Readonly<Record<'pasrel', ClientSafeProvider>>
  styleDuBouton: 'bouton' | 'lien'
}>

export default function Connexion({ providers, styleDuBouton }: ConnexionProps): ReactElement {
  const classe = styleDuBouton === 'bouton' ? 'btn btn--plain btn--primary' : 'nav-link'

  return (
    <button
      className={classe}
      onClick={async () => signIn(providers.pasrel.id)}
      type="button"
    >
      Se connecter
    </button>
  )
}
