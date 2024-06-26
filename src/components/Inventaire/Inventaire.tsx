'use client'

import { ReactElement } from 'react'

import Actions from './Actions'
import Equipement from './Equipement'
import { useInventaire } from './useInventaire'
import { InventairePresenter } from '../../presenters/inventairePresenter'
import { formaterEnIdentifiant, formaterLeNomEtablissement } from '../../presenters/sharedPresenter'
import AlerteSucces from '../sharedComponents/AlerteSucces'

type InventaireProps = Readonly<{
  nomEtablissement: string
  nomInventaire: string
  presenter: InventairePresenter
}>

export default function Inventaire({ nomEtablissement, nomInventaire, presenter }: InventaireProps): ReactElement {
  const { enregistrerUnInventaire, isInventaireEnregistre, quantiteGlobale, setQuantiteGlobale } = useInventaire(nomEtablissement, nomInventaire)

  return (
    <form
      action="indicateurs-cles"
      className="inventaire"
      method="post"
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
          <AlerteSucces marge={7}>
            <h2 className="o-alert__title">
              Inventaire enregistré
            </h2>
            <p>
              Votre inventaire a bien été enregistré.
              <br />
              Vous pourrez le modifier depuis votre liste d’inventaire.
            </p>
          </AlerteSucces>
        ) : null
      }
      <h2 className="text-center fw-bold">
        Renseigner les équipements
      </h2>
      <p className="text-center">
        Pour calculer l’empreinte environnementale de l’inventaire, vous devez renseigner au moins un modèle d’équipement.
      </p>
      {
        presenter.equipementsAvecSesModeles.map((equipementAvecSesModeles): ReactElement => {
          const id = formaterEnIdentifiant(equipementAvecSesModeles.type)

          return (
            <Equipement
              equipementAvecSesModeles={equipementAvecSesModeles}
              idAccordion={id}
              idFieldset={'id-' + id}
              key={id}
              setQuantiteGlobale={setQuantiteGlobale}
            />
          )
        })
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
