import React, { ReactElement } from 'react'

import { EquipementPresenter } from '../../presenters/listeEquipementsPresenter'
import { genererUnIdentifiantUnique } from '../../presenters/sharedPresenter'

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
          <th scope="col">
            Durée de vie en années
          </th>
          <th scope="col">
            Heures d’utilisation par jour
          </th>
        </tr>
      </thead>
      <tbody>
        {
          equipements.map((equipement): ReactElement => (
            <tr key={equipement.modele + genererUnIdentifiantUnique()}>
              <td>
                {equipement.modele}
              </td>
              <td>
                {equipement.quantite}
              </td>
              <td>
                {equipement.dureeDeVie}
              </td>
              <td>
                {equipement.heuresUtilisation}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
