import React, { ReactElement } from 'react'

import { EquipementPresenter } from '../../presenters/listeEquipementsPresenter'

type EquipementProps = Readonly<{
  equipements: ReadonlyArray<EquipementPresenter>
}>

export default function Equipement({ equipements }: EquipementProps): ReactElement {
  return (
    <table className="table table-bordered">
      <caption className="nav-skip">
        Liste des
        {' '}
        {equipements[0].type}
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
          equipements.map((equipement): ReactElement => (
            <tr key={equipement.modele + crypto.randomUUID()}>
              <td>
                {equipement.modele}
              </td>
              <td>
                {equipement.quantite}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
