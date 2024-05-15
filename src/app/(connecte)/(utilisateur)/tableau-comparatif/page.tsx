import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfilAtih } from '../../../../authentification'
import Breadcrumb from '../../../../components/sharedComponents/Breadcrumb'
import TableauComparatif from '../../../../components/TableauComparatif/TableauComparatif'
import { tableauComparatifPresenter } from '../../../../presenters/tableauComparatifPresenter'
import { recupererLesIndicateursImpactsEquipementsRepository } from '../../../../repositories/indicateursRepository'
import { recupererLesModelesRepository } from '../../../../repositories/modelesRepository'

const title = 'Tableau comparatif'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams?: Readonly<{
    inventaireCompare?: string
    inventaireReference?: string
  }>
}>

export default async function PageTableauComparatif({ searchParams }: PageProps): Promise<ReactElement> {
  if (searchParams?.inventaireCompare === undefined || searchParams.inventaireReference === undefined) {
    notFound()
  }

  const profil = await getProfilAtih()

  if (profil.isAdmin) {
    notFound()
  }

  const indicateursImpactsEquipementsCompareModel = await recupererLesIndicateursImpactsEquipementsRepository(
    profil.nomEtablissement,
    searchParams.inventaireCompare
  )

  if (indicateursImpactsEquipementsCompareModel.length === 0) {
    notFound()
  }

  const indicateursImpactsEquipementsReferenceModel = await recupererLesIndicateursImpactsEquipementsRepository(
    profil.nomEtablissement,
    searchParams.inventaireReference
  )

  if (indicateursImpactsEquipementsReferenceModel.length === 0) {
    notFound()
  }

  const modelesCompareModel = await recupererLesModelesRepository(profil.nomEtablissement, searchParams.inventaireCompare)
  const modelesReferenceModel = await recupererLesModelesRepository(profil.nomEtablissement, searchParams.inventaireReference)

  return (
    <>
      <Breadcrumb label={title} />
      <TableauComparatif
        presenterCompare={tableauComparatifPresenter(
          indicateursImpactsEquipementsCompareModel,
          modelesCompareModel,
          profil.nomEtablissement,
          searchParams.inventaireCompare
        )}
        presenterReference={tableauComparatifPresenter(
          indicateursImpactsEquipementsReferenceModel,
          modelesReferenceModel,
          profil.nomEtablissement,
          searchParams.inventaireReference
        )}
      />
    </>
  )
}
