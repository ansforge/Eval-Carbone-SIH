import { inventaireModel } from '@prisma/client'
import { Metadata } from 'next'
import { ReactElement } from 'react'

import { getProfilAtih } from '../../../../authentification'
import InventairesLayout from '../../../../components/Inventaires/InventairesLayout'
import { inventairesPresenter } from '../../../../presenters/inventairesPresenter'
import { recupererLeTotalInventairesRepository, recupererLesInventairesPaginesRepository, recupererLesInventairesRepository } from '../../../../repositories/inventairesRepository'

export const metadata: Metadata = {
  title: 'Inventaires',
}

type PageProps = Readonly<{
  searchParams?: Readonly<{
    page?: string
  }>
}>

export default async function PageInventaires({ searchParams }: PageProps): Promise<ReactElement> {
  const profil = await getProfilAtih()
  const pageCourante = Number(searchParams?.page ?? 0)

  // eslint-disable-next-line @typescript-eslint/init-declarations
  let inventairesModel: ReadonlyArray<inventaireModel>
  let totalInventaires = 0
  if (profil.isAdmin) {
    inventairesModel = await recupererLesInventairesPaginesRepository(pageCourante)
    totalInventaires = await recupererLeTotalInventairesRepository()
  } else {
    inventairesModel = await recupererLesInventairesRepository(profil.nomEtablissement)
  }

  return (
    <InventairesLayout
      presenter={inventairesPresenter(inventairesModel, profil, pageCourante, totalInventaires)}
    />
  )
}
