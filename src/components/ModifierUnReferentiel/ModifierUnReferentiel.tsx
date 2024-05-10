'use client'

import { ReactElement } from 'react'

import SoumettreUnReferentiel from './SoumettreUnReferentiel'
import { useModifierUnReferentiel } from './useModifierUnReferentiel'
import AlerteErreur from '../sharedComponents/AlerteErreur'
import AlerteSucces from '../sharedComponents/AlerteSucces'

export default function ModifierUnReferentiel(): ReactElement {
  const {
    isDisabled,
    isReferentielModifieErreur,
    isReferentielModifieSucces,
    modifierUnReferentiel,
    selectionnerFichierReferentiel,
    validerLeformulaire,
  } = useModifierUnReferentiel()

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 text-center">
        <h1 className="fw-bold">
          Modifier un référentiel
        </h1>
        <p>
          En tant qu’administrateur, assurez-vous de respecter le format requis des référentiels
          car cela influe directement le formulaire de l’inventaire à saisir et le calcul des indicateurs.
        </p>
        <p>
          Vous avez la possibilité de faire des modification sur les référentiels suivants :
          correspondanceRefEquipement, impactequipements, correspondanceTypeEquipement, mixelecs, typeEquipement.
        </p>
        {
          isReferentielModifieSucces ? (
            <AlerteSucces marge={12}>
              <h2 className="o-alert__title">
                Référentiel mis à jour avec succès
              </h2>
              <p>
                L’ancien référentiel a été mis à jour.
                Assurez-vous que d’autres référentiels ne nécessitent pas de mise à jour et que le parcours est fonctionnel.
              </p>
            </AlerteSucces>
          ) : null
        }
        {
          isReferentielModifieErreur !== '' ? (
            <AlerteErreur marge={12}>
              <h2 className="o-alert__title">
                Une erreur est survenue
              </h2>
              <pre>
                {isReferentielModifieErreur}
              </pre>
            </AlerteErreur>
          ) : null
        }
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={modifierUnReferentiel}
        >
          <div className="form-group text-left">
            <label htmlFor="fichierReferentiel">
              Fichier
              {' '}
              <abbr
                lang="en-GB"
                title="Comma-separated values"
              >
                CSV
              </abbr>
            </label>
            <input
              accept=".csv"
              className="form-control"
              id="fichierReferentiel"
              name="fichierReferentiel"
              onChange={selectionnerFichierReferentiel}
              required
              type="file"
            />
          </div>
          <SoumettreUnReferentiel
            isDisabled={isDisabled}
            validerLeformulaire={validerLeformulaire}
          />
        </form>
      </div>
    </div>
  )
}
