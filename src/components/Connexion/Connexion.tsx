'use client'

import { BuiltInProviderType } from 'next-auth/providers'
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react'
import { ReactElement } from 'react'

type LoginProps = Readonly<{
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null
}>

export default function Connexion({ providers }: LoginProps): ReactElement {
  return (
    <div className="text-center">
      {providers ? Object.values(providers).map((provider): ReactElement => (
        <div key={provider.name}>
          <button
            className="btn btn--plain btn--primary"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() => signIn(provider.id)}
            type="button"
          >
            Se connecter avec Plage
          </button>
        </div>
      )) : null}
    </div>
  )
}
