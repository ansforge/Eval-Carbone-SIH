'use client'

import { ReactElement } from 'react'

import { useCreerUnInventaire } from './useCreerUnInventaire'
import { formaterLeNomEtablissement } from '../../presenters/sharedPresenter'
import NomInventaire from '../sharedComponents/NomInventaire'

type CreerUnInventaireProps = Readonly<{
  nomEtablissement: string
}>

export default function CreerUnInventaire({ nomEtablissement }: CreerUnInventaireProps): ReactElement {
  const { creerInventaire, isDisabled, isInvalid, nouveauNomInventaire, modifierNouveauNomInventaire } = useCreerUnInventaire()

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 text-center">
        <h1 className="fw-bold">
          Créer un inventaire
        </h1>
        <p className="fw-bold">
          pour l’établissement
          {' '}
          {formaterLeNomEtablissement(nomEtablissement)}
        </p>
        <p>
          Pour créer un inventaire, vous aurez besoin de renseigner les modèles des équipements de votre parc informatique et leur quantité.
        </p>
        <form
          action="/inventaire"
          onSubmit={creerInventaire}
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
            Continuer
          </button>
        </form>
      </div>
    </div>
  )
}
