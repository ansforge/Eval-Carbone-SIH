import { inventaireModel } from '@prisma/client'

import { StatutsInventaire, formaterLaDateEnFrancais } from './sharedPresenter'
import { ProfilAtih } from '../authentification'

export type InventairePresenter = Readonly<{
  className: string
  dateInventaire: string
  id: number
  link: string
  nomInventaire: string
  nomEtablissement: string
  statut: StatutsInventaire
}>

export type InventairesPresenter = Readonly<{
  isAdmin: boolean
  inventaires: ReadonlyArray<InventairePresenter>
}>

export function inventairesPresenter(inventairesModel: ReadonlyArray<inventaireModel>, profil: ProfilAtih): InventairesPresenter {
  const inventaires = inventairesModel.map((inventaireModel): InventairePresenter => {
    const statut = StatutsInventaire[inventaireModel.statut as keyof typeof StatutsInventaire]
    const path = statut === StatutsInventaire.EN_ATTENTE ? '/inventaire' : '/indicateurs-cles'
    const statusParam = statut === StatutsInventaire.EN_ATTENTE ? `&statut=${StatutsInventaire.EN_ATTENTE}` : ''

    return {
      className: statut.toLowerCase().replace(' ', '_'),
      dateInventaire: formaterLaDateEnFrancais(inventaireModel.dateInventaire),
      id: inventaireModel.id,
      link: encodeURI(`${path}?nomEtablissement=${inventaireModel.nomEtablissement}&nomInventaire=${inventaireModel.nomInventaire}${statusParam}`),
      nomEtablissement: inventaireModel.nomEtablissement,
      nomInventaire: inventaireModel.nomInventaire,
      statut,
    }
  })

  return {
    inventaires,
    isAdmin: profil.isAdmin,
  }
}
