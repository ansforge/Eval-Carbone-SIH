import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { estCeQueLeNomInventaireExisteAction } from './action'

type State = Readonly<{
  isDisabled: boolean
  isInvalid: boolean
  nomInventaire: string
}>

type UseCreerUnInventaire = Readonly<{
  creerInventaire: (event: FormEvent<HTMLFormElement>) => Promise<void>
  isDisabled: boolean
  isInvalid: boolean
  modifierNomInventaire: (event: FormEvent<HTMLInputElement>) => void
  nomInventaire: string
}>

export function useCreerUnInventaire(): UseCreerUnInventaire {
  const router = useRouter()
  const [state, setState] = useState<State>({
    isDisabled: true,
    isInvalid: false,
    nomInventaire: '',
  })

  const creerInventaire = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nomInventaire = formData.get('nomInventaire') as string
    const nomEtablissement = formData.get('nomEtablissement') as string

    const existe = await estCeQueLeNomInventaireExisteAction(nomInventaire)

    if (!existe) {
      const url = new URL('/inventaire', document.location.href)
      url.searchParams.append('nomEtablissement', nomEtablissement)
      url.searchParams.append('nomInventaire', nomInventaire)

      router.push(url.toString())
    } else {
      setState({
        isDisabled: true,
        isInvalid: true,
        nomInventaire: state.nomInventaire,
      })
    }
  }

  const modifierNomInventaire = (event: FormEvent<HTMLInputElement>) => {
    setState({
      isDisabled: event.currentTarget.value.length > 3 ? false : true,
      isInvalid: false,
      nomInventaire: event.currentTarget.value,
    })
  }

  return {
    creerInventaire,
    isDisabled: state.isDisabled,
    isInvalid: state.isInvalid,
    modifierNomInventaire,
    nomInventaire: state.nomInventaire,
  }
}


