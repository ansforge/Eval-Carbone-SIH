import { ReactElement } from 'react'

import Equipement from './Equipement'
import Accordeon from '../commun/Accordeon'
import Actions from '../commun/Actions'
import Onglets from '../commun/Onglets'
import { EquipementsViewModel } from '../viewModel'

type ListeEquipementsProps = Readonly<{
  dateInventaire: string
  equipementsViewModel: EquipementsViewModel
  nomEtablissement: string
  nomInventaire: string
}>

export default function ListeEquipements({ dateInventaire, equipementsViewModel, nomEtablissement, nomInventaire }: ListeEquipementsProps): ReactElement {
  return (
    <>
      <Actions
        dateInventaire={dateInventaire}
        nomEtablissement={nomEtablissement}
        nomInventaire={nomInventaire}
      />
      <Onglets
        isSelected={false}
        nomEtablissement={nomEtablissement}
        nomInventaire={nomInventaire}
      />
      {
        Object.keys(equipementsViewModel).map((equipementViewModel): ReactElement => {
          const quantite = equipementsViewModel[equipementViewModel].reduce((quantiteAccumulee, modele): number => quantiteAccumulee + modele.quantite, 0)

          return (
            <Accordeon
              idAccordion={equipementsViewModel[equipementViewModel][0].type}
              idSection={'id-' + equipementsViewModel[equipementViewModel][0].type}
              key={equipementsViewModel[equipementViewModel][0].type}
              label={`${equipementsViewModel[equipementViewModel][0].type} (${quantite})`}
            >
              <Equipement
                equipementsViewModel={equipementsViewModel[equipementViewModel]}
              />
            </Accordeon>
          )
        })
      }
    </>
  )
}
