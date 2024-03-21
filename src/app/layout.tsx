import { PropsWithChildren, ReactElement } from 'react'

import '../../public/style/style-ans.css'
import '../components/override.css'

export default function Layout({ children }: PropsWithChildren): ReactElement {
  return (
    <html
      dir="ltr"
      lang="fr"
    >
      <head>
        <meta
          content="IE=edge"
          httpEquiv="X-UA-Compatible"
        />
        <meta
          content="width=device-width,initial-scale=1"
          name="viewport"
        />
        <link
          href="./img/favicon.ico"
          rel="shortcut icon"
          type="image/x-icon"
        />
      </head>
      <body>
        <div className="body-wrapper">
          {children}
        </div>
      </body>
    </html>
  )
}
