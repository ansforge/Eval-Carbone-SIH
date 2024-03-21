'use client'

import { Alert } from '@reach/alert'
import { ReactElement } from 'react'

import Actions from './Actions'
import Equipement from './Equipement'
import { useInventaire } from './useInventaire'
import { EquipementsAvecSesModelesViewModel, NomModeleViewModel, StatutsInventaire } from '../viewModel'

type InventaireProps = Readonly<{
  dateInventaire: string,
  equipementsAvecSesModelesViewModel: EquipementsAvecSesModelesViewModel[]
  nomEtablissement: string
  nomInventaire: string
  nomsModelesViewModel: NomModeleViewModel[]
  statut: StatutsInventaire
}>

export default function Inventaire({
  dateInventaire,
  equipementsAvecSesModelesViewModel,
  nomEtablissement,
  nomInventaire,
  nomsModelesViewModel,
  statut,
}: InventaireProps): ReactElement {
  const { enregistrerUnInventaireNonCalcule, isInventaireEnregistre, lancerLeCalcul, quantiteGlobale, setQuantiteGlobale } = useInventaire(nomInventaire)

  const actions = (): ReactElement => (
    <Actions
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      enregistrerUnInventaireNonCalcule={enregistrerUnInventaireNonCalcule}
      quantiteGlobale={quantiteGlobale}
      statut={statut}
    />
  )

  return (
    <form
      action="indicateurs-cles"
      className="inventaire"
      method="post"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={lancerLeCalcul}
    >
      <div className="d-flex justify-content-between">
        <div>
          <div className="h3">
            {nomInventaire}
          </div>
          <div>
            {nomEtablissement.split('$$')[0]}
            {' - '}
            {dateInventaire}
          </div>
        </div>
        <div>
          {actions()}
        </div>
      </div>
      <hr />
      {
        isInventaireEnregistre ? (
          <Alert>
            <div className="row justify-content-center">
              <div
                className="o-alert o-alert--success col-md-7"
                role="status"
              >
                <div className="o-alert__icon">
                  <svg
                    aria-hidden="true"
                    className="svg-icon svg-circle-check"
                    focusable="false"
                  >
                    <use xlinkHref="svg-icons/icon-sprite.svg#circle-check" />
                  </svg>
                </div>
                <h2 className="o-alert__title">
                  Inventaire enregistré
                </h2>
                <p>
                  Votre inventaire a bien été enregistré.
                  <br />
                  Vous pourrez le modifier depuis votre liste d’inventaire.
                </p>
              </div>
            </div>
          </Alert>
        ) : null
      }
      <h2 className="text-center fw-bold">
        Renseigner les équipements
      </h2>
      <p className="text-center">
        Pour calculer l’empreinte environnementale de l’inventaire, vous devez renseigner au moins un modèle d’équipement.
      </p>
      {
        equipementsAvecSesModelesViewModel.map((equipementAvecSesModelesViewModel): ReactElement => (
          <Equipement
            equipementAvecSesModelesViewModel={equipementAvecSesModelesViewModel}
            idAccordion={equipementAvecSesModelesViewModel.type}
            idFieldset={'id-' + equipementAvecSesModelesViewModel.type}
            key={equipementAvecSesModelesViewModel.type}
            nomsModelesViewModel={nomsModelesViewModel}
            setQuantiteGlobale={setQuantiteGlobale}
          />
        ))
      }
      <div className="text-center">
        {actions()}
      </div>
    </form>
  )
}
