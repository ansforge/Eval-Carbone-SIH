import { Metadata } from 'next'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../authentification'
import InventairesLayout from '../../components/Inventaires/InventairesLayout'
import { recupererLesInventairesRepository } from '../../gateways/inventairesRepository'
import { inventairesPresenter } from '../../presenters/inventairesPresenter'

export const metadata: Metadata = {
  title: 'Accueil',
}

export default async function Page(): Promise<ReactElement> {
  const profile = await getProfileAtih()

  const inventairesModel = await recupererLesInventairesRepository(profile.nomEtablissement, profile.isAdmin)

  return (
    <InventairesLayout
      presenter={inventairesPresenter(inventairesModel, profile)}
    />
  )
}
