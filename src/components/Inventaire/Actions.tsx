'use client'

import { ReactElement } from 'react'

import { StatutsInventaire } from '../viewModel'

type ModaleProps = Readonly<{
  enregistrerUnInventaireNonCalcule: () => void
  quantiteGlobale: number
  statut: StatutsInventaire
}>

export default function Actions({ enregistrerUnInventaireNonCalcule, quantiteGlobale, statut }: ModaleProps): ReactElement {
  const isNonCalcule = statut === StatutsInventaire.TRAITE

  return (
    <div className="btn-group">
      {
        isNonCalcule ? null : (
          <button
            className="btn btn--ghost btn--default"
            onClick={enregistrerUnInventaireNonCalcule}
            type="button"
          >
            Enregistrer
          </button>
        )
      }
      <button
        className="btn btn--plain btn--primary"
        disabled={quantiteGlobale > 0 ? false : true}
        type="submit"
      >
        Calculer l’empreinte
      </button>
    </div>
  )
}
