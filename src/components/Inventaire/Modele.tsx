import { FormEvent, ReactElement } from 'react'

import { ModeleReducer } from './useEquipement'
import InfoBulle from '../commun/Infobulle'
import { NomModeleViewModel } from '../viewModel'

type ModeleProps = Readonly<{
  id: string
  ligneModele: ModeleReducer
  nomsModelesViewModel: NomModeleViewModel[]
  modifierUnModele: (modele: ModeleReducer) => void
  nomEquipement: string
  supprimerUnModele: () => void
}>

export default function Modele({ id, nomsModelesViewModel, ligneModele, modifierUnModele, nomEquipement, supprimerUnModele }: ModeleProps): ReactElement {
  const modifierQuantite = (event: FormEvent<HTMLInputElement>) => {
    modifierUnModele({
      ...ligneModele,
      quantite: event.currentTarget.valueAsNumber,
    })
  }

  const modifierNomModele = (event: FormEvent<HTMLSelectElement>) => {
    modifierUnModele({
      ...ligneModele,
      nomModele: event.currentTarget.value,
    })
  }

  return (
    <div className="row">
      <div className="form-group col-md-5">
        <label htmlFor={`inventaire-${id}`}>
          Modèle
          <InfoBulle label="Un modèle d’équipement fait référence à un produit spécifique tel que MacBook Pro, Dell XPS, etc. La connaissance précise du nombre d’équipement de chaque modèle permet une estimation plus précise." />
        </label>
        <select
          className="form-control"
          data-nom-equipement={nomEquipement}
          defaultValue={ligneModele.nomModele}
          id={`inventaire-${id}`}
          name={`inventaire-${id}`}
          onChange={modifierNomModele}
        >
          {
            nomsModelesViewModel.map((nomModeleViewModel): ReactElement => (
              <option
                key={nomModeleViewModel.modele}
                value={nomModeleViewModel.modele}
              >
                {nomModeleViewModel.modele}
              </option>
            ))
          }
        </select>
      </div>
      <div className="form-group">
        <label htmlFor={`quantite-${id}`}>
          Quantité
          <InfoBulle label="La quantité correspond au nombre d’unités de chaque modèle d’équipement. Par exemple, renseignez 15 pour la ligne Dell XPS, si votre établissement possède 15 portables Dell XPS." />
        </label>
        <input
          className="form-control"
          id={`quantite-${id}`}
          min={0}
          name={`quantite-${id}`}
          onChange={modifierQuantite}
          type="number"
          value={ligneModele.quantite}
        />
      </div>
      <div className="py-5 pl-2">
        <button
          className="text-primary"
          onClick={supprimerUnModele}
          type="button"
        >
          <svg
            aria-hidden
            className="svg-icon"
            focusable="false"
          >
            <use xlinkHref="/svg-icons/icon-sprite.svg#circle-cross" />
          </svg>
          {' '}
          Supprimer le modèle
        </button>
      </div>
    </div>
  )
}
