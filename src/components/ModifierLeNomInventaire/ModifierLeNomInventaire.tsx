'use client'

import { ReactElement } from 'react'

import { useModifierLeNomInventaire } from './useModifierLeNomInventaire'
import { formaterLeNomEtablissement } from '../../presenters/sharedPresenter'
import NomInventaire from '../sharedComponents/NomInventaire'

type ModifierLeNomInventaireProps = Readonly<{
  ancienNomInventaire: string
  nomEtablissement: string
}>

export default function ModifierLeNomInventaire({ ancienNomInventaire, nomEtablissement }: ModifierLeNomInventaireProps): ReactElement {
  const { isDisabled, isInvalid, modifierLeNomInventaire, modifierNouveauNomInventaire, nouveauNomInventaire } = useModifierLeNomInventaire(ancienNomInventaire)

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 text-center">
        <h1 className="fw-bold">
          Modifier le nom d’inventaire
        </h1>
        <p className="fw-bold">
          Nom de l’inventaire actuel :
          {' '}
          {formaterLeNomEtablissement(ancienNomInventaire)}
        </p>
        <form
          action="/inventaire"
          onSubmit={modifierLeNomInventaire}
        >
          <NomInventaire
            hasAsterisque={false}
            isInvalid={isInvalid}
            modifierNouveauNomInventaire={modifierNouveauNomInventaire}
            nomEtablissement={nomEtablissement}
            nouveauNomInventaire={nouveauNomInventaire}
          />
          <button
            className="btn btn--plain btn--primary"
            disabled={isDisabled}
            type="submit"
          >
            Modifier
          </button>
        </form>
      </div>
    </div>
  )
}
