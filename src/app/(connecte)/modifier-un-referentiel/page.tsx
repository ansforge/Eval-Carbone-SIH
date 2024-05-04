import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfilAtih } from '../../../authentification'
import ModifierUnReferentiel from '../../../components/ModifierUnReferentiel/ModifierUnReferentiel'

const title = 'Modifier un référentiel'
export const metadata: Metadata = {
  title,
}

export default async function PageModifierUnReferentiel(): Promise<ReactElement> {
  const profil = await getProfilAtih()

  if (!profil.isAdmin) {
    notFound()
  }

  return (
    <ModifierUnReferentiel />
  )
}
