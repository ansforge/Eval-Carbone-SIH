import { FormEvent, ReactElement } from 'react'

import { ModeleReducer } from './useEquipement'
import InfoBulle from '../commun/Infobulle'

type ModeleProps = Readonly<{
  id: string
  ligneModele: ModeleReducer
  modifierUnModele: (modele: ModeleReducer) => void
  nomEquipement: string
  nomModele: string
}>

export default function Modele({ id, ligneModele, modifierUnModele, nomEquipement, nomModele }: ModeleProps): ReactElement {
  const modifierQuantite = (event: FormEvent<HTMLInputElement>) => {
    modifierUnModele({
      ...ligneModele,
      quantite: event.currentTarget.valueAsNumber,
    })
  }

  return (
    <div className="row">
      <div className="form-group col-md-7">
        <label htmlFor={`inventaire-${id}`}>
          Modèle
          <InfoBulle label="Un modèle d’équipement fait référence à un produit spécifique tel que MacBook Pro, Dell XPS, etc. La connaissance précise du nombre d’équipement de chaque modèle permet une estimation plus précise." />
        </label>
        <input
          className="form-control"
          data-nom-equipement={nomEquipement}
          disabled
          value={nomModele}
        />
      </div>
      <div className="form-group col-md-2">
        <label htmlFor={`quantite-${id}`}>
          Quantité
          <InfoBulle label="La quantité correspond au nombre d’unités de chaque modèle d’équipement. Par exemple, renseignez 15 pour la ligne Dell XPS, si votre établissement possède 15 portables Dell XPS." />
        </label>
        <input
          className="form-control"
          data-nom-quantite={ligneModele.quantite}
          id={`quantite-${id}`}
          min={0}
          name={`quantite-${id}`}
          onChange={modifierQuantite}
          type="number"
          value={ligneModele.quantite}
        />
      </div>
    </div>
  )
}
