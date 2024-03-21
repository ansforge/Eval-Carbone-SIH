import { en_equipement_physique, ref_correspondance_ref_eqp, ref_type_equipement } from '@prisma/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import Inventaire from '../../../components/Inventaire/Inventaire'
import { ModeleReducer } from '../../../components/Inventaire/useEquipement'
import { EquipementsAvecSesModelesViewModel, NomModeleViewModel, StatutsInventaire } from '../../../components/viewModel'
import { recupererEquipementsPhysiquesRepository, recupererTypesEquipementRepository } from '../../../repository/equipementsRepository'
import { recupererNomsModelesRepository } from '../../../repository/modelesRepository'

const title = 'Renseigner les équipements'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams: Readonly<{
    nomInventaire?: string
    statut?: string
  }>
}>

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  if (searchParams.nomInventaire === undefined) {
    notFound()
  }

  const profile = await getProfileAtih()

  const typesEquipementModel = await recupererTypesEquipementRepository()
  const nomsModelesModel = await recupererNomsModelesRepository()
  const equipementsModel = await recupererEquipementsPhysiquesRepository(profile.nomEtablissement, searchParams.nomInventaire)

  const equipementsAvecSesModelesViewModel = transformTypesEquipementModelToViewModel(typesEquipementModel, equipementsModel)
  const nomsModelesViewModel = transformNomsModelesModelToViewModel(nomsModelesModel)

  const statut = searchParams.statut === undefined ? StatutsInventaire.EN_ATTENTE : searchParams.statut as StatutsInventaire
  const dateInventaire = equipementsAvecSesModelesViewModel.length > 0
    ? equipementsAvecSesModelesViewModel[0].dateInventaire.toLocaleDateString('fr-FR')
    : new Date().toLocaleDateString('fr-FR')

  return (
    <>
      <Breadcrumb label={title} />
      <Inventaire
        dateInventaire={dateInventaire}
        equipementsAvecSesModelesViewModel={equipementsAvecSesModelesViewModel}
        nomEtablissement={profile.nomEtablissement}
        nomInventaire={searchParams.nomInventaire}
        nomsModelesViewModel={nomsModelesViewModel}
        statut={statut}
      />
    </>
  )
}

function transformNomsModelesModelToViewModel(nomsModelesModel: ref_correspondance_ref_eqp[]): NomModeleViewModel[] {
  return nomsModelesModel.map((nomModeleModel): NomModeleViewModel => {
    return {
      modele: nomModeleModel.modele_equipement_source,
    }
  })
}

function transformTypesEquipementModelToViewModel(
  typesEquipementModel: ref_type_equipement[],
  equipementsModel: en_equipement_physique[]
): EquipementsAvecSesModelesViewModel[] {
  return typesEquipementModel.map((typeEquipement): EquipementsAvecSesModelesViewModel => {
    return {
      dateInventaire: equipementsModel.length === 0 ? new Date() : equipementsModel[0].date_lot,
      modeles: equipementsModel
        .filter((equipement): boolean => equipement.type === typeEquipement.type)
        .map((equipement): ModeleReducer => {
          return {
            id: crypto.randomUUID(),
            nomModele: equipement.modele,
            quantite: equipement.quantite,
          }
        }),
      type: typeEquipement.type,
    }
  })
}
