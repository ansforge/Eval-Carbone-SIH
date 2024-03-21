'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { ReactElement } from 'react'

type OngletsProps = Readonly<{
  isSelected: boolean
}>

export default function Onglets({ isSelected }: OngletsProps): ReactElement {
  const searchParams = useSearchParams()
  const nomInventaire = searchParams.get('nomInventaire')
  const pathname = usePathname()

  let titreIndicateursCles: ReactElement
  let titreListeEquipements: ReactElement
  if (pathname === '/indicateurs-cles') {
    titreIndicateursCles = (
      <h1 className="h5">
        Indicateurs clés
      </h1>
    )
    titreListeEquipements = (
      <span className="h5">
        Liste d’équipements
      </span>
    )
  } else {
    titreIndicateursCles = (
      <span className="h5">
        Indicateurs clés
      </span>
    )
    titreListeEquipements = (
      <h1 className="h5">
        Liste d’équipements
      </h1>
    )
  }

  return (
    <nav className="mb-3">
      <ul className="js-tablist">
        <li className="js-tablist__item">
          <Link
            className={`js-tablist__link ${isSelected ? 'selected' : ''}`}
            href={`indicateurs-cles?nomInventaire=${nomInventaire}`}
          >
            {titreIndicateursCles}
          </Link>
        </li>
        <li className="js-tablist__item">
          <Link
            className={`js-tablist__link ${isSelected ? '' : 'selected'}`}
            href={`liste-equipements?nomInventaire=${nomInventaire}`}
          >
            {titreListeEquipements}
          </Link>
        </li>
      </ul>
    </nav>
  )
}
