import { en_equipement_physique } from '@prisma/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import ListeEquipements from '../../../components/ListeEquipements/ListeEquipements'
import { EquipementsViewModel, TypesEquipements } from '../../../components/viewModel'
import { recupererEquipementsPhysiquesRepository } from '../../../repository/equipementsRepository'

const title = 'Liste d’équipements'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams: Readonly<{
    nomInventaire?: string
  }>
}>

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  if (searchParams.nomInventaire === undefined) {
    notFound()
  }

  const profile = await getProfileAtih()

  const equipementsModel = await recupererEquipementsPhysiquesRepository(profile.nomEtablissement, searchParams.nomInventaire)

  if (equipementsModel.length === 0) {
    notFound()
  }

  const equipementsViewModel = transformEquipementModelToViewModel(equipementsModel)

  const equipements = Object.keys(equipementsViewModel)
  const dateInventaire = equipementsViewModel[equipements[0]][0].dateInventaire.toLocaleDateString('fr-FR')

  return (
    <>
      <Breadcrumb label={title} />
      <ListeEquipements
        dateInventaire={dateInventaire}
        equipementsViewModel={equipementsViewModel}
        nomEtablissement={profile.nomEtablissement}
        nomInventaire={searchParams.nomInventaire}
      />
    </>
  )
}

function transformEquipementModelToViewModel(equipementsModel: en_equipement_physique[]): EquipementsViewModel {
  const types = {}

  for (const equipementModel of equipementsModel) {
    // @ts-ignore
    types[equipementModel.type] = [
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...types[equipementModel.type] || [],
      {
        dateInventaire: equipementModel.date_lot,
        modele: equipementModel.modele,
        nomEtablissement: equipementModel.nom_organisation,
        nomInventaire: equipementModel.nom_lot,
        quantite: equipementModel.quantite,
        type: equipementModel.type as keyof typeof TypesEquipements,
      },
    ]
  }

  return types
}
