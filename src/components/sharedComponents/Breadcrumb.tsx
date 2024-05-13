import Link from 'next/link'
import { ReactElement } from 'react'

type BreadcrumbProps = Readonly<{
  label: string
}>

export default function Breadcrumb({ label }: BreadcrumbProps): ReactElement {
  return (
    <nav
      aria-label="Fil d'ariane"
      className="breadcrumb-wrapper"
    >
      <ol className="breadcrumb">
        <li
          className="breadcrumb-item"
          key="Inventaires"
        >
          <Link href="/inventaires">
            Inventaires
            <svg
              aria-hidden
              className="svg-icon svg-angle-right"
              focusable="false"
            >
              <use xlinkHref="/svg-icons/icon-sprite.svg#angle-right" />
            </svg>
          </Link>
        </li>
        <li
          aria-current="page"
          className="breadcrumb-item active"
          key={label}
        >
          {label}
        </li>
      </ol>
    </nav>
  )
}
