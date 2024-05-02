'use client'

import { ReactElement } from 'react'

import { useCreerUnInventaire } from './useCreerUnInventaire'
import { formaterLeNomEtablissement } from '../../presenters/sharedPresenter'
import InfoBulle from '../commun/Infobulle'

type CreerUnInventaireProps = Readonly<{
  nomEtablissement: string
}>

export default function CreerUnInventaire({ nomEtablissement }: CreerUnInventaireProps): ReactElement {
  const { creerInventaire, isDisabled, isInvalid, nomInventaire, modifierNomInventaire } = useCreerUnInventaire()

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
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={creerInventaire}
        >
          <div className={`form-group text-left${isInvalid ? ' is-invalid' : ''}`}>
            <label htmlFor="nomInventaire">
              Nom de l’inventaire (minimum 4 caractères)
              <InfoBulle label="Le nom de l’inventaire permet de différencier facilement les différents inventaires au sein d’une organisation et peut être composé de plusieurs éléments (nom de l’entité, référence temporelle)." />
            </label>
            <input
              aria-describedby={isInvalid ? 'formInputError-error' : ''}
              aria-invalid={isInvalid}
              className={`form-control${isInvalid ? ' is-invalid' : ''}`}
              id="nomInventaire"
              name="nomInventaire"
              onChange={modifierNomInventaire}
              required
              type="text"
              value={nomInventaire}
            />
            {
              isInvalid ? (
                <p
                  className="description"
                  id="formInputError-error"
                >
                  Cet inventaire existe déjà. Modifiez le nom de l’inventaire pour continuer.
                </p>
              ) : null
            }
            <input
              name="nomEtablissement"
              type="hidden"
              value={nomEtablissement}
            />
          </div>
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
