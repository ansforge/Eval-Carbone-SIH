import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import IndicateursCles from '../../../components/IndicateursCles/IndicateursCles'
import { indicateursClesPresenter } from '../../../presenters/indicateursClesPresenter'
import { recupererLesIndicateursImpactsEquipementsRepository, recupererLesIndicateursImpactsEquipementsSommesRepository } from '../../../repository/indicateursRepository'
import { recupererLesReferentielsTypesEquipementsRepository } from '../../../repository/typesEquipementsRepository'

const title = 'Indicateurs clés'
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
        presenter={indicateursClesPresenter(referentielsTypesEquipementsModel, indicateursImpactsEquipementsSommesModel, indicateursImpactsEquipementsModel)}
      />
    </>
  )
}
