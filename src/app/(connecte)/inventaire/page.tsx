import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfilAtih } from '../../../authentification'
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

export type PageProps = Readonly<{
  searchParams: Readonly<{
    dureeDeVie?: string
    heureUtilisation?: string
    nombreEquipement?: string
    nomEtablissement?: string
    nomInventaire?: string
    nouveauNomInventaire?: string
    statut?: StatutsInventaire
  }>
}>

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  if (searchParams.nomEtablissement === undefined || searchParams.nomInventaire === undefined) {
    notFound()
  }

  const profil = await getProfilAtih()

  if (!profil.isAdmin && profil.nomEtablissement !== searchParams.nomEtablissement) {
    notFound()
  }

  const modelesModel = await recupererLesModelesRepository(searchParams.nomEtablissement, searchParams.nomInventaire)

  const referentielsTypesEquipementsModel = await recupererLesReferentielsTypesEquipementsRepository()

  return (
    <>
      <Breadcrumb label={title} />
      <Inventaire
        nomEtablissement={searchParams.nomEtablissement}
        nomInventaire={searchParams.nouveauNomInventaire ?? searchParams.nomInventaire}
        presenter={inventairePresenter(referentielsTypesEquipementsModel, modelesModel, searchParams)}
      />
    </>
  )
}
