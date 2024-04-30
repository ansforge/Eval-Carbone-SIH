'use client'

import Link from 'next/link'
import React, { ReactElement } from 'react'

import ActionSupprimer from './ActionSupprimer'
import styles from './Inventaires.module.css'
import { InventairesViewModel } from '../viewModel'

type InventairesProps = Readonly<{
  inventairesViewModel: InventairesViewModel
}>

export default function Inventaires({ inventairesViewModel }: InventairesProps): ReactElement {
  return (
    <table className="table table-bordered">
      <caption className="nav-skip">
        Votre inventaire
      </caption>
      <thead>
        <tr>
          <th scope="col">
            Nom de l’inventaire
          </th>
          <th scope="col">
            Nom de l’organisation
          </th>
          <th scope="col">
            Date de création
          </th>
          <th scope="col">
            État
          </th>
          <th scope="col">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {
          inventairesViewModel.map((inventaireViewModel): ReactElement => {
            return (
              <tr key={inventaireViewModel.id}>
                <td>
                  <Link href={inventaireViewModel.link}>
                    {inventaireViewModel.nomInventaire}
                  </Link>
                </td>
                <td>
                  {inventaireViewModel.nomEtablissement.split('$$')[0]}
                </td>
                <td>
                  {inventaireViewModel.dateInventaire}
                </td>
                <td>
                  <span className={`${styles.pastille} ${styles[inventaireViewModel.className]} fz-16`}>
                    {inventaireViewModel.statut}
                  </span>
                </td>
                <ActionSupprimer inventaireViewModel={inventaireViewModel} />
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
