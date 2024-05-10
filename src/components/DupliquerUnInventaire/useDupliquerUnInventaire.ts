import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import { dupliquerUnInventaireAction } from './action'
import { isLeNomInventaireExisteAction } from '../sharedComponents/action'
import { useModifierNouveauNomInventaire } from '../sharedComponents/useModifierNouveauNomInventaire'

type UseCreerUneSimulation = Readonly<{
  creerUneSimulation: (event: FormEvent<HTMLFormElement>) => Promise<void>
  isDisabled: boolean
  isInvalid: boolean
  modifierNouveauNomInventaire: (event: FormEvent<HTMLInputElement>) => void
  nouveauNomInventaire: string
}>

export function useDupliquerUnInventaire(ancienNomInventaire: string): UseCreerUneSimulation {
  const date = new Date()
  const router = useRouter()
  const { modifierNouveauNomInventaire, setState, state } = useModifierNouveauNomInventaire(`${ancienNomInventaire} - duplication ${date.toLocaleString()}`, false)

  const creerUneSimulation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const nouveauNomInventaire = formData.get('nouveauNomInventaire') as string
    const nomEtablissement = formData.get('nomEtablissement') as string

    const nomInventaireExiste = await isLeNomInventaireExisteAction(nouveauNomInventaire)

    if (!nomInventaireExiste) {
      await dupliquerUnInventaireAction(nomEtablissement, ancienNomInventaire, nouveauNomInventaire)

      router.push('/')
    } else {
      setState({
        isDisabled: true,
        isInvalid: true,
        nouveauNomInventaire: state.nouveauNomInventaire,
      })
    }
  }

  return {
    creerUneSimulation,
    isDisabled: state.isDisabled,
    isInvalid: state.isInvalid,
    modifierNouveauNomInventaire,
    nouveauNomInventaire: state.nouveauNomInventaire,
  }
}


