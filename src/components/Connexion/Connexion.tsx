'use client'

import { BuiltInProviderType } from 'next-auth/providers'
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react'
import { ReactElement } from 'react'

type ConnexionProps = Readonly<{
  providers: Readonly<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>>
}>

export default function Connexion({ providers }: ConnexionProps): ReactElement {
  return (
    <div className="text-center">
      {
        Object.values(providers).map((provider): ReactElement => (
          <div key={provider.name}>
            <button
              className="btn btn--plain btn--primary"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => signIn(provider.id)}
              type="button"
            >
              Se connecter avec Plage
            </button>
          </div>
        ))
      }
    </div>
  )
}
