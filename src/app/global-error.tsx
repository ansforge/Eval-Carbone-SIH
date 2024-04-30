'use client'

import { ReactElement } from 'react'

type ErrorProps = Readonly<{
  error: Readonly<Error>
}>

export default function GlobalError({ error }: ErrorProps): ReactElement {
  // eslint-disable-next-line no-console
  console.error(error)

  return (
    <html
      dir="ltr"
      lang="fr"
    >
      <body>
        <h1>
          {'Something went wrong!'}
        </h1>
      </body>
    </html>
  )
}
