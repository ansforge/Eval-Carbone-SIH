'use client'

import { ReactElement } from 'react'

import { StatutsInventaire } from '../viewModel'

type ModaleProps = Readonly<{
  quantiteGlobale: number
  statut: StatutsInventaire
}>

export default function Actions({ quantiteGlobale, statut }: ModaleProps): ReactElement {
  const isNonCalcule = statut === StatutsInventaire.TRAITE

  return (
    <div className="btn-group">
      {
        isNonCalcule ? null : (
          <button
            className="btn btn--ghost btn--default"
            name="enregistrer"
            type="submit"
          >
            Enregistrer
          </button>
        )
      }
      <button
        className="btn btn--plain btn--primary"
        disabled={quantiteGlobale > 0 ? false : true}
        name="calculer"
        type="submit"
      >
        Calculer l’empreinte
      </button>
    </div>
  )
}
