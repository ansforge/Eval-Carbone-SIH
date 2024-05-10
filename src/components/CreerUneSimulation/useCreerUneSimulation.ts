import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import { StatutsInventaire } from '../../presenters/sharedPresenter'
import { isLeNomInventaireExisteAction } from '../commun/action'
import { useModifierNouveauNomInventaire } from '../commun/useModifierNouveauNomInventaire'

type UseCreerUneSimulation = Readonly<{
  creerUneSimulation: (event: FormEvent<HTMLFormElement>) => Promise<void>
  isDisabled: boolean
  isInvalid: boolean
  modifierNouveauNomInventaire: (event: FormEvent<HTMLInputElement>) => void
  nouveauNomInventaire: string
}>

export function useCreerUneSimulation(ancienNomInventaire: string): UseCreerUneSimulation {
  const date = new Date()
  const router = useRouter()
  const { modifierNouveauNomInventaire, setState, state } = useModifierNouveauNomInventaire(`${ancienNomInventaire} - simulation ${date.toLocaleString()}`, false)

  const creerUneSimulation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const nouveauNomInventaire = formData.get('nouveauNomInventaire') as string
    const nomEtablissement = formData.get('nomEtablissement') as string
    const nombreEquipement = formData.get('nombreEquipement') as string
    const dureeDeVie = formData.get('dureeDeVie') as string
    const heureUtilisation = formData.get('heureUtilisation') as string

    const nomInventaireExiste = await isLeNomInventaireExisteAction(nouveauNomInventaire)

    if (!nomInventaireExiste) {
      const url = new URL('/inventaire', document.location.href)
      url.searchParams.append('nomEtablissement', nomEtablissement)
      url.searchParams.append('nomInventaire', ancienNomInventaire)
      url.searchParams.append('nouveauNomInventaire', nouveauNomInventaire)
      url.searchParams.append('nombreEquipement', nombreEquipement)
      url.searchParams.append('dureeDeVie', dureeDeVie)
      url.searchParams.append('heureUtilisation', heureUtilisation)
      url.searchParams.append('statut', StatutsInventaire.TRAITE)

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
    creerUneSimulation,
    isDisabled: state.isDisabled,
    isInvalid: state.isInvalid,
    modifierNouveauNomInventaire,
    nouveauNomInventaire: state.nouveauNomInventaire,
  }
}


