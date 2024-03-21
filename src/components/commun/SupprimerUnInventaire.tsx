'use client'

import { useRouter } from 'next/navigation'
import React, { ReactElement } from 'react'

import { supprimerInventaireAction } from '../commun/action'
import Modale from '../commun/Modale'

type SupprimerUnInventaireProps = Readonly<{
  fermerLaModale: () => void
  isOpen: boolean
  nomInventaire: string
}>

export default function SupprimerUnInventaire({ fermerLaModale, isOpen, nomInventaire }: SupprimerUnInventaireProps): ReactElement {
  const router = useRouter()

  const supprimerInventaire = async () => {
    await supprimerInventaireAction(nomInventaire)

    router.push('/')
    router.refresh()
    fermerLaModale()
  }

  return (
    <Modale
      fermerLaModale={fermerLaModale}
      isOpen={isOpen}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      submit={supprimerInventaire}
      titre={'Supprimer l’inventaire'}
    >
      <p>
        Si vous supprimez l’inventaire, celui si sera définitivement effacé et ne sera plus accessible dans la liste des inventaires.
      </p>
    </Modale>
  )
}
