import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

import { caracteresMinimumPourUnNomInventaire } from '../../configuration'

type State = Readonly<{
  isDisabled: boolean
  isInvalid: boolean
  nouveauNomInventaire: string
}>

type UseModifierNouveauNomInventaire = Readonly<{
  modifierNouveauNomInventaire: (event: FormEvent<HTMLInputElement>) => void
  setState: Dispatch<SetStateAction<State>>,
  state: State
}>

export function useModifierNouveauNomInventaire(ancienNomInventaire: string, isDisabled = true): UseModifierNouveauNomInventaire {
  const [state, setState] = useState<State>({
    isDisabled,
    isInvalid: false,
    nouveauNomInventaire: ancienNomInventaire,
  })

  const modifierNouveauNomInventaire = (event: FormEvent<HTMLInputElement>) => {
    setState({
      isDisabled: event.currentTarget.value.length >= caracteresMinimumPourUnNomInventaire ? false : true,
      isInvalid: false,
      nouveauNomInventaire: event.currentTarget.value,
    })
  }

  return {
    modifierNouveauNomInventaire,
    setState,
    state,
  }
}
