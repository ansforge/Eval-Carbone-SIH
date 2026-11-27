import { useRouter } from 'next/navigation'
import { ChangeEvent, SubmitEvent } from 'react'

import { dupliquerUnInventaireAction } from './action'
import { isLeNomInventaireExisteAction } from '../sharedComponents/action'
import { useModifierNouveauNomInventaire } from '../sharedComponents/useModifierNouveauNomInventaire'

type UseCreerUneSimulation = Readonly<{
  creerUneSimulation: (event: SubmitEvent<HTMLFormElement>) => Promise<void>
  isDisabled: boolean
  isInvalid: boolean
  modifierNouveauNomInventaire: (event: ChangeEvent<HTMLInputElement>) => void
  nouveauNomInventaire: string
}>

export function useDupliquerUnInventaire(ancienNomInventaire: string): UseCreerUneSimulation {
  const date = new Date()
  const router = useRouter()
  const { modifierNouveauNomInventaire, setState, state } = useModifierNouveauNomInventaire(`${ancienNomInventaire} - duplication ${date.toLocaleString('fr-FR')}`, false)

  const creerUneSimulation = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const nouveauNomInventaire = formData.get('nouveauNomInventaire') as string
    const nomEtablissement = formData.get('nomEtablissement') as string

    const nomInventaireExiste = await isLeNomInventaireExisteAction(nouveauNomInventaire)

    if (!nomInventaireExiste) {
      await dupliquerUnInventaireAction(nomEtablissement, ancienNomInventaire, nouveauNomInventaire)

      router.push('/inventaires')
      router.refresh()
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


