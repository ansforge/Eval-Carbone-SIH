'use client'

import React, { ReactElement } from 'react'

import { InventairePresenter } from '../../presenters/inventairesPresenter'
import SupprimerUnInventaire from '../sharedComponents/SupprimerUnInventaire'
import { useModale } from '../sharedComponents/useModale'

type InventairesProps = Readonly<{
  inventaire: InventairePresenter
}>

export default function ActionSupprimer({ inventaire }: InventairesProps): ReactElement {
  const { fermerLaModale, isOpen, ouvrirLaModale } = useModale()

  return (
    <td>
      <button
        onClick={ouvrirLaModale}
        type="button"
      >
        <svg
          aria-hidden
          className="svg-icon"
          focusable="false"
        >
          <use xlinkHref="/svg-icons/icon-sprite.svg#trash" />
        </svg>
        <span className="sr-only">
          Supprimer l’inventaire
        </span>
      </button>
      <SupprimerUnInventaire
        fermerLaModale={fermerLaModale}
        isOpen={isOpen}
        nomEtablissement={inventaire.nomEtablissement}
        nomInventaire={inventaire.nomInventaire}
      />
    </td>
  )
}
