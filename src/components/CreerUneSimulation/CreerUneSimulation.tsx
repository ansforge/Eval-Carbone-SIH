'use client'

import { ReactElement } from 'react'

import styles from './CreerUneSimulation.module.css'
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
    dureeDeVie,
    heureUtilisation,
    isDisabled,
    isInvalid,
    modifierDureeDeVie,
    modifierHeureUtilisation,
    modifierNombreEquipement,
    modifierNouveauNomInventaire,
    nombreEquipement,
    nouveauNomInventaire,
  } = useCreerUneSimulation(ancienNomInventaire)

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 text-center">
        <h1 className="fw-bold">
          Créer une simulation
        </h1>
        <p className="fw-bold">
          pour l’établissement
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
            <label htmlFor="nombreEquipement">
              Nombre d’équipements en %
            </label>
            <InfoBulle label="Par exemple, en inscrivant le chiffre 10, chaque équipement verra son nombre augmenter de 10 %." />
            <input
              className={'form-control'}
              id="nombreEquipement"
              max={100}
              min={-100}
              name="nombreEquipement"
              onChange={modifierNombreEquipement}
              type="number"
              value={nombreEquipement}
            />
            <label htmlFor="dureeDeVie">
              Durée de vie en années
            </label>
            <InfoBulle label="Par exemple, en inscrivant le chiffre 2, la durée de vie souhaitée de chaque équipement augmentera de 2 ans." />
            <input
              className={'form-control'}
              id="dureeDeVie"
              max={20}
              min={-20}
              name="dureeDeVie"
              onChange={modifierDureeDeVie}
              type="number"
              value={dureeDeVie}
            />
            <label htmlFor="heureUtilisation">
              Heures d’utilisation par jour
            </label>
            <InfoBulle label="Par exemple, en inscrivant le chiffre -5, le nombre d'heures d'utilisation par équipement sera réduit de 5 heures." />
            <input
              className={'form-control'}
              id="heureUtilisation"
              max={24}
              min={-24}
              name="heureUtilisation"
              onChange={modifierHeureUtilisation}
              type="number"
              value={heureUtilisation}
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
