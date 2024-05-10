import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import { isLeNomInventaireExisteAction } from '../commun/action'
import { useModifierNouveauNomInventaire } from '../commun/useModifierNouveauNomInventaire'

type UseCreerUnInventaire = Readonly<{
  creerInventaire: (event: FormEvent<HTMLFormElement>) => Promise<void>
  isDisabled: boolean
  isInvalid: boolean
  modifierNouveauNomInventaire: (event: FormEvent<HTMLInputElement>) => void
  nouveauNomInventaire: string
}>

export function useCreerUnInventaire(): UseCreerUnInventaire {
  const router = useRouter()
  const { modifierNouveauNomInventaire, setState, state } = useModifierNouveauNomInventaire('')

  const creerInventaire = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const nomInventaire = formData.get('nomInventaire') as string
    const nomEtablissement = formData.get('nomEtablissement') as string

    const nomInventaireExiste = await isLeNomInventaireExisteAction(nomInventaire)

    if (!nomInventaireExiste) {
      const url = new URL('/inventaire', document.location.href)
      url.searchParams.append('nomEtablissement', nomEtablissement)
      url.searchParams.append('nomInventaire', nomInventaire)

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
    creerInventaire,
    isDisabled: state.isDisabled,
    isInvalid: state.isInvalid,
    modifierNouveauNomInventaire,
    nouveauNomInventaire: state.nouveauNomInventaire,
  }
}


