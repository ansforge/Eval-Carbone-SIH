import { modeleModel } from '@prisma/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import ListeEquipements from '../../../components/ListeEquipements/ListeEquipements'
import { EquipementsViewModel } from '../../../components/viewModel'
import { recupererLesModelesRepository } from '../../../repository/modelesRepository'
import { recupererLesReferentielsTypesEquipementsRepository, ReferentielTypeEquipementModel } from '../../../repository/typesEquipementsRepository'

const title = 'Liste d’équipements'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams: Readonly<{
    nomEtablissement?: string
    nomInventaire?: string
  }>
}>

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  if (searchParams.nomEtablissement === undefined || searchParams.nomInventaire === undefined) {
    notFound()
  }

  const profile = await getProfileAtih()

  if (!profile.isAdmin && profile.nomEtablissement !== searchParams.nomEtablissement) {
    notFound()
  }

  const modelesModel = await recupererLesModelesRepository(searchParams.nomEtablissement, searchParams.nomInventaire)

  if (modelesModel.length === 0) {
    notFound()
  }

  const referentielsTypesEquipementsModel = await recupererLesReferentielsTypesEquipementsRepository()
  const equipementsViewModel = transformerLesReferentielsTypesEquipementsModelEnViewModel(referentielsTypesEquipementsModel, modelesModel)

  const modeles = Object.keys(equipementsViewModel)
  const dateInventaire = equipementsViewModel[modeles[0]][0].dateInventaire.toLocaleDateString('fr-FR')

  return (
    <>
      <Breadcrumb label={title} />
      <ListeEquipements
        dateInventaire={dateInventaire}
        equipementsViewModel={equipementsViewModel}
        nomEtablissement={searchParams.nomEtablissement}
        nomInventaire={searchParams.nomInventaire}
      />
    </>
  )
}

function transformerLesReferentielsTypesEquipementsModelEnViewModel(
  referentielsTypesEquipementsModel: Array<ReferentielTypeEquipementModel>,
  modelesModel: Array<modeleModel>
): EquipementsViewModel {
  const types: EquipementsViewModel = {}

  for (const modeleModel of modelesModel.sort(trierParTypeEquipementEtEtapeAcv(referentielsTypesEquipementsModel))) {
    const ancienModeleModel = types[modeleModel.type] ?? []

    // @ts-expect-error
    types[modeleModel.type] = [
      ...ancienModeleModel,
      {
        dateInventaire: modeleModel.dateInventaire,
        modele: modeleModel.nom,
        nomEtablissement: modeleModel.nomEtablissement,
        nomInventaire: modeleModel.nomInventaire,
        quantite: modeleModel.quantite,
        type: modeleModel.type,
      },
    ]
  }

  return types
}

function trierParTypeEquipementEtEtapeAcv(referentielsTypesEquipementsModel: Array<ReferentielTypeEquipementModel>) {
  return (a: modeleModel, b: modeleModel) => {
    let etapeAcvA = 0
    let etapeAcvB = 0

    for (let poids = 0; poids < referentielsTypesEquipementsModel.length; poids++) {
      if (a.type === referentielsTypesEquipementsModel[poids].type) {
        etapeAcvA = poids
      }

      if (b.type === referentielsTypesEquipementsModel[poids].type) {
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
