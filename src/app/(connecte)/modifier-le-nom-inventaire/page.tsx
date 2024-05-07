import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import Breadcrumb from '../../../components/commun/Breadcrumb'
import ModifierLeNomInventaire from '../../../components/ModifierLeNomInventaire/ModifierLeNomInventaire'

const title = 'Modifier le nom de l’inventaire'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams?: Readonly<{
    nomEtablissement?: string
    nomInventaire?: string
  }>
}>

export default function PageModifierLeNomInventaire({ searchParams }: PageProps): ReactElement {
  if (searchParams?.nomEtablissement === undefined || searchParams.nomInventaire === undefined) {
    notFound()
  }

  return (
    <>
      <Breadcrumb label={title} />
      <ModifierLeNomInventaire
        nomEtablissement={searchParams.nomEtablissement}
        nomInventaire={searchParams.nomInventaire}
      />
    </>
  )
}
