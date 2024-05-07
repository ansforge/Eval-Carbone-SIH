import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { estCeQueLeNomInventaireExisteAction, modifierLeNomInventaireAction } from './action'

type State = Readonly<{
  isDisabled: boolean
  isInvalid: boolean
  nouveauNomInventaire: string
}>

type UseModifierLeNomInventaire = Readonly<{
  creerUneSimulation: (event: FormEvent<HTMLFormElement>) => Promise<void>
  isDisabled: boolean
  isInvalid: boolean
  modifierNouveauNomInventaire: (event: FormEvent<HTMLInputElement>) => void
  nouveauNomInventaire: string
}>

export function useModifierLeNomInventaire(ancienNomInventaire: string): UseModifierLeNomInventaire {
  const router = useRouter()
  const [state, setState] = useState<State>({
    isDisabled: true,
    isInvalid: false,
    nouveauNomInventaire: ancienNomInventaire,
  })

  const creerUneSimulation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const nouveauNomInventaire = formData.get('nouveauNomInventaire') as string
    const nomEtablissement = formData.get('nomEtablissement') as string

    const nomInventaireExiste = await estCeQueLeNomInventaireExisteAction(nouveauNomInventaire)

    if (!nomInventaireExiste) {
      await modifierLeNomInventaireAction(ancienNomInventaire, nouveauNomInventaire)

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

  const modifierNouveauNomInventaire = (event: FormEvent<HTMLInputElement>) => {
    const caracteresMinimumPourUnNomInventaire = 4

    setState({
      isDisabled: event.currentTarget.value.length >= caracteresMinimumPourUnNomInventaire ? false : true,
      isInvalid: false,
      nouveauNomInventaire: event.currentTarget.value,
    })
  }

  return {
    creerUneSimulation,
    isDisabled: state.isDisabled,
    isInvalid: state.isInvalid,
    modifierNouveauNomInventaire,
    nouveauNomInventaire: state.nouveauNomInventaire,
  }
}


