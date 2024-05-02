import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import Inventaire from '../../../components/Inventaire/Inventaire'
import { recupererLesModelesRepository } from '../../../gateways/modelesRepository'
import { recupererLesReferentielsTypesEquipementsRepository } from '../../../gateways/typesEquipementsRepository'
import { inventairePresenter } from '../../../presenters/inventairePresenter'
import { StatutsInventaire } from '../../../presenters/sharedPresenter'

const title = 'Renseigner les équipements'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams: Readonly<{
    nomEtablissement?: string
    nomInventaire?: string
    statut?: string
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

  const referentielsTypesEquipementsModel = await recupererLesReferentielsTypesEquipementsRepository()

  const statut = searchParams.statut === undefined ? StatutsInventaire.EN_ATTENTE : searchParams.statut as StatutsInventaire

  return (
    <>
      <Breadcrumb label={title} />
      <Inventaire
        nomEtablissement={searchParams.nomEtablissement}
        nomInventaire={searchParams.nomInventaire}
        presenter={inventairePresenter(referentielsTypesEquipementsModel, modelesModel, statut)}
      />
    </>
  )
}
