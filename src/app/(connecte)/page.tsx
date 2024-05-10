import { Metadata } from 'next'
import { ReactElement } from 'react'

import { getProfilAtih } from '../../authentification'
import InventairesLayout from '../../components/Inventaires/InventairesLayout'
import { inventairesPresenter } from '../../presenters/inventairesPresenter'
import { recupererLesInventairesRepository } from '../../repositories/inventairesRepository'

export const metadata: Metadata = {
  title: 'Accueil',
}

export default async function PageInventaires(): Promise<ReactElement> {
  const profil = await getProfilAtih()

  const inventairesModel = await recupererLesInventairesRepository(profil.nomEtablissement)

  return (
    <InventairesLayout
      presenter={inventairesPresenter(inventairesModel, profil)}
    />
  )
}
