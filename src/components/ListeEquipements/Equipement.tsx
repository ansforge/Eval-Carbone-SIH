import React, { ReactElement } from 'react'

import { EquipementViewModel } from '../viewModel'

type EquipementProps = Readonly<{
  equipementsViewModel: EquipementViewModel[]
}>

export default function Equipement({ equipementsViewModel }: EquipementProps): ReactElement {
  return (
    <table className="table table-bordered">
      <caption className="nav-skip">
        Liste des
        {' '}
        {equipementsViewModel[0].type}
      </caption>
      <thead>
        <tr>
          <th scope="col">
            Modèle
          </th>
          <th scope="col">
            Quantité
          </th>
        </tr>
      </thead>
      <tbody>
        {
          equipementsViewModel.map((equipementViewModel): ReactElement => (
            <tr key={equipementViewModel.modele + crypto.randomUUID()}>
              <td>
                {equipementViewModel.modele}
              </td>
              <td>
                {equipementViewModel.quantite}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
