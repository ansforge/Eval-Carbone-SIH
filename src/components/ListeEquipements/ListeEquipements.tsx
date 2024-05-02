import { ReactElement } from 'react'

import Equipement from './Equipement'
import { ListeEquipementsPresenter } from '../../presenters/listeEquipementsPresenter'
import Accordeon from '../commun/Accordeon'
import Actions from '../commun/Actions'
import Onglets from '../commun/Onglets'

type ListeEquipementsProps = Readonly<{
  nomEtablissement: string
  nomInventaire: string
  presenter: ListeEquipementsPresenter
}>

export default function ListeEquipements({ nomEtablissement, nomInventaire, presenter }: ListeEquipementsProps): ReactElement {
  return (
    <>
      <Actions
        dateInventaire={presenter.dateInventaire}
        nomEtablissement={nomEtablissement}
        nomInventaire={nomInventaire}
      />
      <Onglets
        isSelected={false}
        nomEtablissement={nomEtablissement}
        nomInventaire={nomInventaire}
      />
      {
        Object.keys(presenter.equipements).map((equipement): ReactElement => {
          const quantite = presenter.equipements[equipement]
            .reduce((quantiteAccumulee, modele): number => quantiteAccumulee + modele.quantite, 0)

          return (
            <Accordeon
              idAccordion={presenter.equipements[equipement][0].type}
              idSection={'id-' + presenter.equipements[equipement][0].type}
              key={presenter.equipements[equipement][0].type}
              label={`${presenter.equipements[equipement][0].type} (${quantite})`}
            >
              <Equipement
                equipements={presenter.equipements[equipement]}
              />
            </Accordeon>
          )
        })
      }
    </>
  )
}
