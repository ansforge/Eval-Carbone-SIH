import { inventaireModel } from '@prisma/client'

import { StatutsInventaire } from './sharedPresenter'
import { ProfileAtih } from '../authentification'

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
  inventaires: Array<InventairePresenter>
}>

export function inventairesPresenter(inventairesModel: Array<inventaireModel>, profile: ProfileAtih): InventairesPresenter {
  const inventaires = inventairesModel.map((inventaireModel): InventairePresenter => {
    const statut = StatutsInventaire[inventaireModel.statut as keyof typeof StatutsInventaire]
    const path = statut === StatutsInventaire.EN_ATTENTE ? '/inventaire' : '/indicateurs-cles'
    const statusParam = statut === StatutsInventaire.EN_ATTENTE ? `&statut=${StatutsInventaire.EN_ATTENTE}` : ''

    return {
      className: statut.toLowerCase().replace(' ', '_'),
      dateInventaire: inventaireModel.dateInventaire.toLocaleDateString('fr-FR'),
      id: inventaireModel.id,
      link: `${path}?nomEtablissement=${encodeURI(inventaireModel.nomEtablissement)}&nomInventaire=${encodeURI(inventaireModel.nomInventaire)}${statusParam}`,
      nomEtablissement: inventaireModel.nomEtablissement,
      nomInventaire: inventaireModel.nomInventaire,
      statut,
    }
  })

  return {
    inventaires,
    isAdmin: profile.isAdmin,
  }
}
