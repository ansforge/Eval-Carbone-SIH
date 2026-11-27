import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import ModifierLeNomInventaire from '../../../../components/ModifierLeNomInventaire/ModifierLeNomInventaire'
import Breadcrumb from '../../../../components/sharedComponents/Breadcrumb'

const title = 'Modifier le nom de l’inventaire'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams: Promise<Readonly<{
    nomEtablissement?: string
    nomInventaire?: string
  }>>
}>

export default async function PageModifierLeNomInventaire({ searchParams: searchParamsPromise }: PageProps): Promise<ReactElement> {
  const searchParams = await searchParamsPromise
  if (searchParams.nomEtablissement === undefined || searchParams.nomInventaire === undefined) {
    notFound()
  }

  return (
    <>
      <Breadcrumb label={title} />
      <ModifierLeNomInventaire
        ancienNomInventaire={searchParams.nomInventaire}
        nomEtablissement={searchParams.nomEtablissement}
      />
    </>
  )
}
