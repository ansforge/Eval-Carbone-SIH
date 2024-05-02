import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import ListeEquipements from '../../../components/ListeEquipements/ListeEquipements'
import { recupererLesModelesRepository } from '../../../gateways/modelesRepository'
import { recupererLesReferentielsTypesEquipementsRepository } from '../../../gateways/typesEquipementsRepository'
import { listeEquipementsPresenter } from '../../../presenters/listeEquipementsPresenter'

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

  return (
    <>
      <Breadcrumb label={title} />
      <ListeEquipements
        nomEtablissement={searchParams.nomEtablissement}
        nomInventaire={searchParams.nomInventaire}
        presenter={listeEquipementsPresenter(referentielsTypesEquipementsModel, modelesModel)}
      />
    </>
  )
}
