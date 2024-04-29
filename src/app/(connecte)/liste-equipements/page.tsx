import { en_equipement_physique, ref_type_equipement } from '@prisma/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import ListeEquipements from '../../../components/ListeEquipements/ListeEquipements'
import { EquipementsViewModel } from '../../../components/viewModel'
import { EquipementPhysiqueModel, recupererLesEquipementsEnregistresRepository, recupererLesReferentielsEquipementsRepository } from '../../../repository/equipementsRepository'

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

  const equipementsEnregistresModel = await recupererLesEquipementsEnregistresRepository(profile.nomEtablissement, searchParams.nomInventaire)

  if (equipementsEnregistresModel.length === 0) {
    notFound()
  }

  const referentielsEquipementsModel = await recupererLesReferentielsEquipementsRepository()
  const equipementsViewModel = transformEquipementModelToViewModel(equipementsEnregistresModel, referentielsEquipementsModel)

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

function transformEquipementModelToViewModel(
  equipementsModel: en_equipement_physique[],
  referentielsEquipementsModel: EquipementPhysiqueModel[]
): EquipementsViewModel {
  const types = {}

  for (const equipementModel of equipementsModel.sort(sortByTypeEquipementAndEtapeAcv(referentielsEquipementsModel))) {
    // @ts-expect-error
    types[equipementModel.type] = [
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...types[equipementModel.type] || [],
      {
        dateInventaire: equipementModel.date_lot,
        modele: equipementModel.modele,
        nomEtablissement: equipementModel.nom_organisation,
        nomInventaire: equipementModel.nom_lot,
        quantite: equipementModel.quantite,
        type: equipementModel.type,
      },
    ]
  }

  return types
}

function sortByTypeEquipementAndEtapeAcv(referentielsEquipementsViewModel: ref_type_equipement[]) {
  return (a: en_equipement_physique, b: en_equipement_physique) => {
    let etapeAcvA = 0
    let etapeAcvB = 0

    for (let poids = 0; poids < referentielsEquipementsViewModel.length; poids++) {
      if (a.type === referentielsEquipementsViewModel[poids].type) {
        etapeAcvA = poids
      }

      if (b.type === referentielsEquipementsViewModel[poids].type) {
        etapeAcvB = poids
      }
    }

    if (etapeAcvA > etapeAcvB) {
      return 1
    }

    if (etapeAcvA < etapeAcvB) {
      return -1
    }

    return 0
  }
}
