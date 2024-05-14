import { ReactElement } from 'react'

import DernierePage from './DernierePage'
import Page from './Page'
import PremierePage from './PremierePage'

type PaginationProps = Readonly<{
  pageCourante: number
  totalInventaires: number
}>

export default function Pagination({ pageCourante, totalInventaires }: PaginationProps): ReactElement {
  return (
    <nav aria-label="Pagination">
      <ol className="pagination justify-content-center align-items-center">
        <li className="page-item page-prev">
          <PremierePage />
        </li>
        <Page
          nombreDeResultat={totalInventaires}
          pageCourante={pageCourante}
        />
        <li className="page-item page-next">
          <DernierePage
            nombreDeResultat={totalInventaires}
            pageCourante={pageCourante}
          />
        </li>
      </ol>
    </nav>
  )
}
