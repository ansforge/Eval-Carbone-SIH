import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import { modifierLeNomInventaireAction } from './action'
import { isLeNomInventaireExisteAction } from '../commun/action'
import { useModifierNouveauNomInventaire } from '../commun/useModifierNouveauNomInventaire'

type UseModifierLeNomInventaire = Readonly<{
  isDisabled: boolean
  isInvalid: boolean
  modifierLeNomInventaire: (event: FormEvent<HTMLFormElement>) => Promise<void>
  modifierNouveauNomInventaire: (event: FormEvent<HTMLInputElement>) => void
  nouveauNomInventaire: string
}>

export function useModifierLeNomInventaire(ancienNomInventaire: string): UseModifierLeNomInventaire {
  const router = useRouter()
  const { modifierNouveauNomInventaire, setState, state } = useModifierNouveauNomInventaire(ancienNomInventaire)

  const modifierLeNomInventaire = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const nouveauNomInventaire = formData.get('nouveauNomInventaire') as string
    const nomEtablissement = formData.get('nomEtablissement') as string

    const nomInventaireExiste = await isLeNomInventaireExisteAction(nouveauNomInventaire, nomEtablissement)

    if (!nomInventaireExiste) {
      await modifierLeNomInventaireAction(ancienNomInventaire, nouveauNomInventaire, nomEtablissement)

      const url = new URL('/indicateurs-cles', document.location.href)
      url.searchParams.append('nomEtablissement', nomEtablissement)
      url.searchParams.append('nomInventaire', nouveauNomInventaire)

      router.push(url.toString())
    } else {
      setState({
        isDisabled: true,
        isInvalid: true,
        nouveauNomInventaire: state.nouveauNomInventaire,
      })
    }
  }

  return {
    isDisabled: state.isDisabled,
    isInvalid: state.isInvalid,
    modifierLeNomInventaire,
    modifierNouveauNomInventaire,
    nouveauNomInventaire: state.nouveauNomInventaire,
  }
}


