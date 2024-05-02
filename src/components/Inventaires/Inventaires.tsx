'use client'

import Link from 'next/link'
import React, { ReactElement } from 'react'

import ActionSupprimer from './ActionSupprimer'
import styles from './Inventaires.module.css'
import { InventairePresenter } from '../../presenters/inventairesPresenter'
import { formaterLeNomEtablissement } from '../../presenters/sharedPresenter'

type InventairesProps = Readonly<{
  inventaires: ReadonlyArray<InventairePresenter>
}>

export default function Inventaires({ inventaires }: InventairesProps): ReactElement {
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
          inventaires.map((inventaire): ReactElement => {
            return (
              <tr key={inventaire.id}>
                <td>
                  <Link href={inventaire.link}>
                    {inventaire.nomInventaire}
                  </Link>
                </td>
                <td>
                  {formaterLeNomEtablissement(inventaire.nomEtablissement)}
                </td>
                <td>
                  {inventaire.dateInventaire}
                </td>
                <td>
                  <span className={`${styles.pastille} ${styles[inventaire.className]} fz-16`}>
                    {inventaire.statut}
                  </span>
                </td>
                <ActionSupprimer inventairePresenter={inventaire} />
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
