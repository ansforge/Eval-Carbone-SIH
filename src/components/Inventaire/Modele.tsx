import { FormEvent, ReactElement } from 'react'

import { ModeleReducer } from './useEquipement'
import InfoBulle from '../sharedComponents/Infobulle'

type ModeleProps = Readonly<{
  id: string
  ligneModele: ModeleReducer
  modifierUnModele: (modele: ModeleReducer) => void
  nomEquipement: string
  nomModele: string
}>

export default function Modele({ id, ligneModele, modifierUnModele, nomEquipement, nomModele }: ModeleProps): ReactElement {
  const modifierUneValeurDuModele = (clef: string) => (event: FormEvent<HTMLInputElement>) => {
    modifierUnModele({
      ...ligneModele,
      [clef]: event.currentTarget.valueAsNumber,
    })
  }

  return (
    <div className="row">
      <div className="form-group col-md-4">
        <label htmlFor={`inventaire-${id}`}>
          Modèle
        </label>
        <InfoBulle label="Un modèle d’équipement fait référence à un produit spécifique tel que MacBook Pro, Dell XPS, etc. La connaissance précise du nombre d’équipement de chaque modèle permet une estimation plus précise." />
        <div className="ml-1">
          {nomModele}
        </div>
        <input
          data-nom-equipement={nomEquipement}
          id={`inventaire-${id}`}
          type="hidden"
          value={ligneModele.nomModele}
        />
      </div>
      <div className="form-group col-md-2">
        <label htmlFor={`quantite-${id}`}>
          Quantité
        </label>
        <InfoBulle label="La quantité correspond au nombre d’unités de chaque modèle d’équipement. Par exemple, renseignez 15 pour la ligne Dell XPS, si votre établissement possède 15 portables Dell XPS." />
        <input
          className="form-control"
          data-quantite={true}
          id={`quantite-${id}`}
          min={0}
          name={`quantite-${id}`}
          onChange={modifierUneValeurDuModele('quantite')}
          type="number"
          value={ligneModele.quantite}
        />
      </div>
      <div className="form-group col-md-3">
        <label htmlFor={`duree-de-vie-${id}`}>
          Durée de vie en années
        </label>
        <InfoBulle label="La durée de vie correspond à la période souhaitée pendant laquelle un équipement devrait être opérationnel et fonctionner de manière satisfaisante, exprimée en années." />
        <input
          className="form-control"
          data-duree-de-vie={true}
          id={`duree-de-vie-${id}`}
          min={1}
          name={`duree-de-vie-${id}`}
          onChange={modifierUneValeurDuModele('dureeDeVie')}
          type="number"
          value={ligneModele.dureeDeVie}
        />
      </div>
      <div className="form-group col-md-3">
        <label htmlFor={`heure-${id}`}>
          Heures d’utilisation par jour
        </label>
        <InfoBulle label="Le nombre d’heures d’utilisation quotidienne d’un équipement représente le temps moyen passé à utiliser cet appareil sur 24h, exprimé en heures." />
        <input
          className="form-control"
          data-heure-utilisation={true}
          id={`heure-${id}`}
          max={24}
          min={1}
          name={`heure-${id}`}
          onChange={modifierUneValeurDuModele('heureUtilisation')}
          type="number"
          value={ligneModele.heureUtilisation}
        />
      </div>
    </div>
  )
}
