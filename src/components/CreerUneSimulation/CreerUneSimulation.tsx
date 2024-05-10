'use client'

import { ReactElement } from 'react'

import styles from './CreerUneSimulation.module.css'
import DureeDeVie from './DureeDeVie'
import HeureUtilisation from './HeureUtilisation'
import NombreEquipement from './NombreEquipement'
import { useCreerUneSimulation } from './useCreerUneSimulation'
import { formaterLeNomEtablissement } from '../../presenters/sharedPresenter'
import InfoBulle from '../commun/Infobulle'

type CreerUneSimulationProps = Readonly<{
  ancienNomInventaire: string
  nomEtablissement: string
}>

export default function CreerUneSimulation({ ancienNomInventaire, nomEtablissement }: CreerUneSimulationProps): ReactElement {
  const {
    creerUneSimulation,
    isDisabled,
    isInvalid,
    modifierNouveauNomInventaire,
    nouveauNomInventaire,
  } = useCreerUneSimulation(ancienNomInventaire)

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 text-center">
        <h1 className="fw-bold">
          Créer une simulation
        </h1>
        <p className="fw-bold">
          Inventaire à simuler
          {' '}
          {formaterLeNomEtablissement(nomEtablissement)}
        </p>
        <p>
          Explorez une stratégie de réduction de votre empreinte environnementale, en faisant varier certaines données de votre inventaire.
          <br />
          * champs obligatoires
        </p>
        <form
          action="/inventaire"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={creerUneSimulation}
        >
          <div className={`form-group text-left${isInvalid ? ' is-invalid' : ''}`}>
            <label htmlFor="nouveauNomInventaire">
              Nom de l’inventaire * (minimum 4 caractères)
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
            <input
              name="nomInventaire"
              type="hidden"
              value={ancienNomInventaire}
            />
          </div>
          <div className={`border text-left rounded-sm top-left-radius-0 p-3 mb-4 ${styles.astuce}`}>
            <p className="h3 fw-bold text-left">
              Variation d’opportunités de réduction
            </p>
            <p>
              Ces variations, positives ou négatives, seront appliquées à l’ensemble de votre inventaire initial.
            </p>
            <NombreEquipement />
            <DureeDeVie />
            <HeureUtilisation />
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
