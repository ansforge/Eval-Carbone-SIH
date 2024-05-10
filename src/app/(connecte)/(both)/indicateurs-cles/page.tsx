import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfilAtih } from '../../../../authentification'
import IndicateursCles from '../../../../components/IndicateursCles/IndicateursCles'
import Breadcrumb from '../../../../components/sharedComponents/Breadcrumb'
import { indicateursClesPresenter } from '../../../../presenters/indicateursClesPresenter'
import { recupererLesIndicateursImpactsEquipementsRepository, recupererLesIndicateursImpactsEquipementsSommesRepository } from '../../../../repositories/indicateursRepository'
import { recupererLesReferentielsTypesEquipementsRepository } from '../../../../repositories/typesEquipementsRepository'

const title = 'Indicateurs clés'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams?: Readonly<{
    nomEtablissement?: string
    nomInventaire?: string
  }>
}>

export default async function PageIndicateursCles({ searchParams }: PageProps): Promise<ReactElement> {
  if (searchParams?.nomEtablissement === undefined || searchParams.nomInventaire === undefined) {
    notFound()
  }

  const profil = await getProfilAtih()

  if (!profil.isAdmin && profil.nomEtablissement !== searchParams.nomEtablissement) {
    notFound()
  }

  const indicateursImpactsEquipementsModel = await recupererLesIndicateursImpactsEquipementsRepository(
    searchParams.nomEtablissement,
    searchParams.nomInventaire
  )

  if (indicateursImpactsEquipementsModel.length === 0) {
    notFound()
  }

  const indicateursImpactsEquipementsSommesModel = await recupererLesIndicateursImpactsEquipementsSommesRepository(
    searchParams.nomEtablissement,
    searchParams.nomInventaire
  )

  const referentielsTypesEquipementsModel = await recupererLesReferentielsTypesEquipementsRepository()

  return (
    <>
      <Breadcrumb label={title} />
      <IndicateursCles
        nomEtablissement={searchParams.nomEtablissement}
        nomInventaire={searchParams.nomInventaire}
        presenter={indicateursClesPresenter(
          referentielsTypesEquipementsModel,
          indicateursImpactsEquipementsSommesModel,
          indicateursImpactsEquipementsModel,
          profil
        )}
      />
    </>
  )
}
