'use client'

import React, { ReactElement } from 'react'

import SupprimerUnInventaire from '../commun/SupprimerUnInventaire'
import { useModale } from '../commun/useModale'
import { InventaireViewModel } from '../viewModel'

type InventairesProps = Readonly<{
  inventaireViewModel: InventaireViewModel
}>

export default function ActionSupprimer({ inventaireViewModel }: InventairesProps): ReactElement {
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
      </button>
      <SupprimerUnInventaire
        fermerLaModale={fermerLaModale}
        isOpen={isOpen}
        nomEtablissement={inventaireViewModel.nomEtablissement}
        nomInventaire={inventaireViewModel.nomInventaire}
      />
    </td>
  )
}
