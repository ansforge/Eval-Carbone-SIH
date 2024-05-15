'use client'

import { useRouter } from 'next/navigation'
import React, { ReactElement } from 'react'

import { supprimerInventaireAction } from '../sharedComponents/action'
import Modale from '../sharedComponents/Modale'

type SupprimerUnInventaireProps = Readonly<{
  fermerLaModale: () => void
  isOpen: boolean
  nomEtablissement: string
  nomInventaire: string
}>

export default function SupprimerUnInventaire({ fermerLaModale, isOpen, nomInventaire, nomEtablissement }: SupprimerUnInventaireProps): ReactElement {
  const router = useRouter()

  const supprimerInventaire = async () => {
    await supprimerInventaireAction(nomEtablissement, nomInventaire)

    router.push('/inventaires')
    router.refresh()
    fermerLaModale()
  }

  return (
    <Modale
      fermerLaModale={fermerLaModale}
      isOpen={isOpen}
      titre={'Supprimer l’inventaire'}
      validerLaModale={supprimerInventaire}
    >
      <p>
        Si vous supprimez l’inventaire, celui-ci sera définitivement effacé et ne sera plus accessible dans la liste des inventaires.
      </p>
    </Modale>
  )
}
