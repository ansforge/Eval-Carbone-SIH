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
  const equipements = Object.keys(equipementsViewModel)

  return (
    <>
      <Actions
        dateInventaire={dateInventaire}
        nomEtablissement={nomEtablissement}
        nomInventaire={nomInventaire}
      />
      <Onglets isSelected={false} />
      {
        equipements.map((equipement): ReactElement => {
          const quantite = equipementsViewModel[equipement].reduce((quantiteAccumulee, modele): number => quantiteAccumulee + modele.quantite, 0)

          return (
            <Accordeon
              idAccordion={equipementsViewModel[equipement][0].type}
              idSection={'id-' + equipementsViewModel[equipement][0].type}
              key={equipementsViewModel[equipement][0].type}
              label={`${equipementsViewModel[equipement][0].type} (${quantite})`}
            >
              <Equipement
                equipementsViewModel={equipementsViewModel[equipement]}
              />
            </Accordeon>
          )
        })
      }
    </>
  )
}
