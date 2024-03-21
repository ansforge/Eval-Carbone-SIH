import { en_donnees_entrees } from '@prisma/client'
import { Metadata } from 'next'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../authentification'
import InventairesLayout from '../../components/Inventaires/InventairesLayout'
import { InventaireViewModel, StatutsInventaire } from '../../components/viewModel'
import { recupererInventairesRepository } from '../../repository/inventairesRepository'

export const metadata: Metadata = {
  title: 'Accueil',
}

export default async function Page(): Promise<ReactElement> {
  const profile = await getProfileAtih()

  const inventairesModel = await recupererInventairesRepository(profile.nomEtablissement)

  const inventairesViewModel = transformInventairesModelToViewModel(inventairesModel)

  return (
    <InventairesLayout inventairesViewModel={inventairesViewModel} />
  )
}

function transformInventairesModelToViewModel(inventairesModel: en_donnees_entrees[]): InventaireViewModel[] {
  return inventairesModel.map((inventaireModel): InventaireViewModel => {
    const statut = StatutsInventaire[inventaireModel.statut_traitement as keyof typeof StatutsInventaire]
    const path = statut === StatutsInventaire.EN_ATTENTE ? '/inventaire' : '/indicateurs-cles'
    const statusParam = statut === StatutsInventaire.EN_ATTENTE ? `&statut=${StatutsInventaire.EN_ATTENTE}` : ''

    return {
      className: statut.toLowerCase().replace(' ', '_'),
      dateInventaire: inventaireModel.date_lot.toLocaleDateString('fr-FR'),
      id: inventaireModel.id,
      link: `${path}?nomInventaire=${inventaireModel.nom_lot}${statusParam}`,
      nomEtablissement: inventaireModel.nom_organisation,
      nomInventaire: inventaireModel.nom_lot,
      statut,
    }
  })
}
