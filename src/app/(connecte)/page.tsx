import { inventaireModel } from '@prisma/client'
import { Metadata } from 'next'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../authentification'
import InventairesLayout from '../../components/Inventaires/InventairesLayout'
import { InventaireViewModel, StatutsInventaire } from '../../components/viewModel'
import { recupererLesInventairesRepository } from '../../repository/inventairesRepository'

export const metadata: Metadata = {
  title: 'Accueil',
}

export default async function Page(): Promise<ReactElement> {
  const profile = await getProfileAtih()

  const inventairesModel = await recupererLesInventairesRepository(profile.nomEtablissement, profile.isAdmin)

  const inventairesViewModel = transformerLesInventairesModelEnViewModel(inventairesModel)

  return (
    <InventairesLayout
      inventairesViewModel={inventairesViewModel}
      isAdmin={profile.isAdmin}
    />
  )
}

function transformerLesInventairesModelEnViewModel(inventairesModel: Array<inventaireModel>): Array<InventaireViewModel> {
  return inventairesModel.map((inventaireModel): InventaireViewModel => {
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
}
