import { ReactElement } from 'react'

import Equipement from './Equipement'
import { ListeEquipementsPresenter } from '../../presenters/listeEquipementsPresenter'
import { formaterEnIdentifiant } from '../../presenters/sharedPresenter'
import Accordeon from '../sharedComponents/Accordeon'
import Actions from '../sharedComponents/Actions'
import Onglets from '../sharedComponents/Onglets'

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
          const id = formaterEnIdentifiant(presenter.equipements[equipement][0].type)

          return (
            <Accordeon
              idAccordion={id}
              idSection={'id-' + id}
              key={id}
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
