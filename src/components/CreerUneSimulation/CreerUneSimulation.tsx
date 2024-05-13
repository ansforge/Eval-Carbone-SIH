'use client'

import { ReactElement } from 'react'

import styles from './CreerUneSimulation.module.css'
import DureeDeVie from './DureeDeVie'
import HeureUtilisation from './HeureUtilisation'
import NombreEquipement from './NombreEquipement'
import { useCreerUneSimulation } from './useCreerUneSimulation'
import { formaterLeNomEtablissement } from '../../presenters/sharedPresenter'
import NomInventaire from '../sharedComponents/NomInventaire'

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
          onSubmit={creerUneSimulation}
        >
          <NomInventaire
            hasAsterisque={true}
            isInvalid={isInvalid}
            modifierNouveauNomInventaire={modifierNouveauNomInventaire}
            nomEtablissement={nomEtablissement}
            nouveauNomInventaire={nouveauNomInventaire}
          />
          <div className={`border text-left rounded-sm top-left-radius-0 p-3 mt-4 mb-4 ${styles.astuce}`}>
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
