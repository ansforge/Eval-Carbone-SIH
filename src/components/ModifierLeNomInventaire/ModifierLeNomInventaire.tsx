'use client'

import { ReactElement } from 'react'

import { useModifierLeNomInventaire } from './useModifierLeNomInventaire'
import { formaterLeNomEtablissement } from '../../presenters/sharedPresenter'
import InfoBulle from '../sharedComponents/Infobulle'

type ModifierLeNomInventaireProps = Readonly<{
  nomEtablissement: string
  nomInventaire: string
}>

export default function ModifierLeNomInventaire({ nomEtablissement, nomInventaire }: ModifierLeNomInventaireProps): ReactElement {
  const { isDisabled, isInvalid, modifierLeNomInventaire, modifierNouveauNomInventaire, nouveauNomInventaire } = useModifierLeNomInventaire(nomInventaire)

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 text-center">
        <h1 className="fw-bold">
          Modifier le nom d’inventaire
        </h1>
        <p className="fw-bold">
          Nom de l’inventaire actuel :
          {' '}
          {formaterLeNomEtablissement(nomInventaire)}
        </p>
        <form
          action="/inventaire"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={modifierLeNomInventaire}
        >
          <div className={`form-group text-left${isInvalid ? ' is-invalid' : ''}`}>
            <label htmlFor="nouveauNomInventaire">
              Nom de l’inventaire (minimum 4 caractères)
            </label>
            <InfoBulle label="Le nom de l’inventaire permet de différencier facilement les différents inventaires au sein d’une organisation et peut être composé de plusieurs éléments (nom de l’entité, référence temporelle)." />
            <input
              aria-describedby={isInvalid ? 'formInputError-error' : ''}
              aria-invalid={isInvalid}
              className={`form-control${isInvalid ? ' is-invalid' : ''}`}
              id="nouveauNomInventaire"
              name="nouveauNomInventaire"
              onChange={modifierNouveauNomInventaire}
              required
              type="text"
              value={nouveauNomInventaire}
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
            Modifier
          </button>
        </form>
      </div>
    </div>
  )
}
