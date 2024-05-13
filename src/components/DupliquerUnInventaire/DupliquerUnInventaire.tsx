'use client'

import { ReactElement } from 'react'

import { useDupliquerUnInventaire } from './useDupliquerUnInventaire'
import { formaterLeNomEtablissement } from '../../presenters/sharedPresenter'
import NomInventaire from '../sharedComponents/NomInventaire'

type DupliquerUnInventaireProps = Readonly<{
  ancienNomInventaire: string
  nomEtablissement: string
}>

export default function DupliquerUnInventaire({ ancienNomInventaire, nomEtablissement }: DupliquerUnInventaireProps): ReactElement {
  const {
    creerUneSimulation,
    isDisabled,
    isInvalid,
    modifierNouveauNomInventaire,
    nouveauNomInventaire,
  } = useDupliquerUnInventaire(ancienNomInventaire)

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 text-center">
        <h1 className="fw-bold">
          Dupliquer un inventaire
        </h1>
        <p className="fw-bold">
          pour l’établissement
          {' '}
          {formaterLeNomEtablissement(nomEtablissement)}
        </p>
        <p>
          En dupliquant l’inventaire, une copie de l’inventaire initial sera créée avec les mêmes équipements.
          Vous pourrez modifier ces équipement à posteriori.
        </p>
        <form
          action="/inventaire"
          onSubmit={creerUneSimulation}
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
            Dupliquer
          </button>
        </form>
      </div>
    </div>
  )
}
