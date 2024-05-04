'use client'

import React, { ReactElement } from 'react'

import { InventairePresenter } from '../../presenters/inventairesPresenter'
import SupprimerUnInventaire from '../commun/SupprimerUnInventaire'
import { useModale } from '../commun/useModale'

type InventairesProps = Readonly<{
  inventairePresenter: InventairePresenter
}>

export default function ActionSupprimer({ inventairePresenter }: InventairesProps): ReactElement {
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
          Supprimer un inventaire
        </span>
      </button>
      <SupprimerUnInventaire
        fermerLaModale={fermerLaModale}
        isOpen={isOpen}
        nomEtablissement={inventairePresenter.nomEtablissement}
        nomInventaire={inventairePresenter.nomInventaire}
      />
    </td>
  )
}
