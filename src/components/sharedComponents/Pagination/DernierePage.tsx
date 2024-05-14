import Link from 'next/link'
import { ReactElement } from 'react'

import { pagination } from './pagination'

type DernierePageProps = Readonly<{
  nombreDeResultat: number
  pageCourante: number
}>

export default function DernierePage({ nombreDeResultat, pageCourante }: DernierePageProps): ReactElement {
  const { nombreDePage } = pagination(nombreDeResultat, pageCourante)
  const dernierePage = nombreDePage - 1

  return (
    <Link
      className="page-link"
      href={{
        pathname: '/inventaires',
        query: {
          page: dernierePage,
        },
      }}
    >
      <svg
        aria-hidden="true"
        className="svg-icon svg-angle-right"
        focusable="false"
      >
        <use xlinkHref="svg-icons/icon-sprite.svg#angle-right" />
      </svg>
      <span className="sr-only">
        Page suivante
      </span>
    </Link>
  )
}
