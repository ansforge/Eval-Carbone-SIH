import { ChangeEvent, SubmitEvent, useState } from 'react'

import { modifierUnReferentielAction } from './action'
import { tempsAlerte } from '../../configuration'

type State = Readonly<{
  isDisabled: boolean
  isFichierReferentielVide: boolean
}>

type UseReferentiel = Readonly<{
  isDisabled: boolean
  isReferentielModifieErreur: string
  isReferentielModifieSucces: boolean
  modifierUnReferentiel: (event: SubmitEvent<HTMLFormElement>) => Promise<void>
  selectionnerFichierReferentiel: (event: ChangeEvent<HTMLInputElement>) => void
  validerLeformulaire: () => void
}>

export function useModifierUnReferentiel(): UseReferentiel {
  const [state, setState] = useState<State>({
    isDisabled: true,
    isFichierReferentielVide: true,
  })
  const [isReferentielModifieSucces, setIsReferentielModifieSucces] = useState(false)
  const [isReferentielModifieErreur, setIsReferentielModifieErreur] = useState('')

  function selectionnerFichierReferentiel(event: ChangeEvent<HTMLInputElement>) {
    const isFichierReferentielRempli = event.currentTarget.value !== ''

    setState((): State => ({
      ...state,
      isDisabled: !isFichierReferentielRempli,
      isFichierReferentielVide: !isFichierReferentielRempli,
    }))
  }

  async function modifierUnReferentiel(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await modifierUnReferentielAction(new FormData(event.currentTarget))

      setIsReferentielModifieSucces(true)
      // istanbul ignore next @preserve
      setTimeout(() => {
        setIsReferentielModifieSucces(false)
      }, tempsAlerte)
    } catch (error) {
      setIsReferentielModifieErreur((error as Error).message)
      // istanbul ignore next @preserve
      setTimeout(() => {
        setIsReferentielModifieErreur('')
      }, tempsAlerte)
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
