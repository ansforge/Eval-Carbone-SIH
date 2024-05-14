import Link from 'next/link'
import { ReactElement } from 'react'

export default function PremierePage(): ReactElement {
  return (
    <Link
      className="page-link"
      href="/inventaires"
    >
      <svg
        aria-hidden="true"
        className="svg-icon svg-angle-left"
        focusable="false"
      >
        <use xlinkHref="svg-icons/icon-sprite.svg#angle-left" />
      </svg>
      <span className="sr-only">
        Page précédente
      </span>
    </Link>
  )
}
