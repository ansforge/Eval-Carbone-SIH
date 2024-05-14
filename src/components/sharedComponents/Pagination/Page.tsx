import Link from 'next/link'
import { ReactElement } from 'react'

import { pagination } from './pagination'

type PageProps = Readonly<{
  nombreDeResultat: number
  pageCourante: number
}>

export default function Page({ nombreDeResultat, pageCourante }: PageProps): ReadonlyArray<ReactElement> {
  const { pages } = pagination(nombreDeResultat, pageCourante)

  return pages.map((page): ReactElement => {
    if (pageCourante === page - 1) {
      return (
        <li
          aria-current="page"
          className="page-item active"
          key={page}
        >
          <span className="page-link">
            <span className="sr-only">
              Page courante
            </span>
            {' '}
            {page}
          </span>
        </li>
      )
    } else {
      return (
        <li key={page}>
          <Link
            className="page-link"
            href={{
              pathname: '/inventaires',
              query: {
                page: page - 1,
              },
            }}
          >
            <span className="sr-only">
              Page
            </span>
            {' '}
            {page}
          </Link>
        </li>
      )
    }
  })
}
