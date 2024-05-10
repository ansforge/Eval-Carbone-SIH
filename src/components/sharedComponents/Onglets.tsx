'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactElement } from 'react'

type OngletsProps = Readonly<{
  nomEtablissement: string
  nomInventaire: string
  isSelected: boolean
}>

export default function Onglets({ isSelected, nomEtablissement, nomInventaire }: OngletsProps): ReactElement {
  const pathname = usePathname()

  let titreIndicateursCles: ReactElement = (
    <span className="h5">
      Indicateurs clés
    </span>
  )
  let titreListeEquipements: ReactElement = (
    <h1 className="h5">
      Liste d’équipements
    </h1>
  )

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
  }

  return (
    <nav className="mb-3">
      <ul className="js-tablist">
        <li className="js-tablist__item">
          <Link
            aria-selected={isSelected ? true : false}
            className={`js-tablist__link ${isSelected ? 'selected' : ''}`}
            href={encodeURI(`indicateurs-cles?nomEtablissement=${nomEtablissement}&nomInventaire=${nomInventaire}`)}
          >
            {titreIndicateursCles}
          </Link>
        </li>
        <li className="js-tablist__item">
          <Link
            aria-selected={isSelected ? false : true}
            className={`js-tablist__link ${isSelected ? '' : 'selected'}`}
            href={encodeURI(`liste-equipements?nomEtablissement=${nomEtablissement}&nomInventaire=${nomInventaire}`)}
          >
            {titreListeEquipements}
          </Link>
        </li>
      </ul>
    </nav>
  )
}
