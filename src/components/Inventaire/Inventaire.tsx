'use client'

import { Alert } from '@reach/alert'
import { ReactElement } from 'react'

import Actions from './Actions'
import Equipement from './Equipement'
import { useInventaire } from './useInventaire'
import { InventairePresenter } from '../../presenters/inventairePresenter'
import { formaterLeNomEtablissement } from '../../presenters/sharedPresenter'

type InventaireProps = Readonly<{
  nomEtablissement: string
  nomInventaire: string
  presenter: InventairePresenter
}>

export default function Inventaire({
  nomEtablissement,
  nomInventaire,
  presenter,
}: InventaireProps): ReactElement {
  const { enregistrerUnInventaire, isInventaireEnregistre, quantiteGlobale, setQuantiteGlobale } = useInventaire(nomEtablissement, nomInventaire)

  return (
    <form
      action="indicateurs-cles"
      className="inventaire"
      method="post"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={enregistrerUnInventaire}
    >
      <div className="d-flex justify-content-between">
        <div>
          <div className="h3">
            {nomInventaire}
          </div>
          <div>
            {formaterLeNomEtablissement(nomEtablissement)}
            {' - '}
            {presenter.dateInventaire}
          </div>
        </div>
        <div>
          <Actions
            isNonCalcule={presenter.isNonCalcule}
            quantiteGlobale={quantiteGlobale}
          />
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
        presenter.equipementsAvecSesModeles.map((equipementAvecSesModeles): ReactElement => (
          <Equipement
            equipementAvecSesModeles={equipementAvecSesModeles}
            idAccordion={equipementAvecSesModeles.type}
            idFieldset={'id-' + equipementAvecSesModeles.type}
            key={equipementAvecSesModeles.type}
            setQuantiteGlobale={setQuantiteGlobale}
          />
        ))
      }
      <div className="text-center">
        <Actions
          isNonCalcule={presenter.isNonCalcule}
          quantiteGlobale={quantiteGlobale}
        />
      </div>
    </form>
  )
}
