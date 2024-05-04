import { FormEvent, useState } from 'react'

import { modifierUnReferentielAction } from './action'

type State = Readonly<{
  isDisabled: boolean
  isFichierReferentielVide: boolean
}>

type UseReferentiel = Readonly<{
  isDisabled: boolean
  isReferentielModifieErreur: string
  isReferentielModifieSucces: boolean
  modifierUnReferentiel: (event: FormEvent<HTMLFormElement>) => Promise<void>
  selectionnerFichierReferentiel: (event: FormEvent<HTMLInputElement>) => void
  validerLeformulaire: () => void
}>

export function useReferentiel(): UseReferentiel {
  const [state, setState] = useState<State>({
    isDisabled: true,
    isFichierReferentielVide: true,
  })
  const [isReferentielModifieSucces, setIsReferentielModifieSucces] = useState(false)
  const [isReferentielModifieErreur, setIsReferentielModifieErreur] = useState('')

  function selectionnerFichierReferentiel(event: FormEvent<HTMLInputElement>) {
    const isFichierReferentielRempli = event.currentTarget.value !== ''

    setState((): State => ({
      ...state,
      isDisabled: !isFichierReferentielRempli,
      isFichierReferentielVide: !isFichierReferentielRempli,
    }))
  }

  async function modifierUnReferentiel(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()

      await modifierUnReferentielAction(new FormData(event.currentTarget))

      setIsReferentielModifieSucces(true)
      // istanbul ignore next @preserve
      setTimeout(() => {
        setIsReferentielModifieSucces(false)
      }, 5000)
    } catch (error) {
      setIsReferentielModifieErreur((error as Error).message)
      // istanbul ignore next @preserve
      setTimeout(() => {
        setIsReferentielModifieErreur('')
      }, 5000)
    }
  }

  function validerLeformulaire() {
    const form = document.querySelector<HTMLFormElement>('form')
    form?.requestSubmit()
  }

  return {
    isDisabled: state.isDisabled,
    isReferentielModifieErreur,
    isReferentielModifieSucces,
    modifierUnReferentiel,
    selectionnerFichierReferentiel,
    validerLeformulaire,
  }
}
