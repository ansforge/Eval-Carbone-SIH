import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { estCeQueLeNomInventaireExisteAction } from './action'
import { StatutsInventaire } from '../../presenters/sharedPresenter'

type State = Readonly<{
  isDisabled: boolean
  isInvalid: boolean
  nouveauNomInventaire: string
}>

type UseCreerUneSimulation = Readonly<{
  creerUneSimulation: (event: FormEvent<HTMLFormElement>) => Promise<void>
  dureeDeVie: string
  heureUtilisation: string
  isDisabled: boolean
  isInvalid: boolean
  modifierDureeDeVie: (event: FormEvent<HTMLInputElement>) => void
  modifierHeureUtilisation: (event: FormEvent<HTMLInputElement>) => void
  modifierNombreEquipement: (event: FormEvent<HTMLInputElement>) => void
  modifierNouveauNomInventaire: (event: FormEvent<HTMLInputElement>) => void
  nombreEquipement: string
  nouveauNomInventaire: string
}>

export function useCreerUneSimulation(ancienNomInventaire: string): UseCreerUneSimulation {
  const date = new Date()
  const router = useRouter()
  const [state, setState] = useState<State>({
    isDisabled: false,
    isInvalid: false,
    nouveauNomInventaire: `${ancienNomInventaire} - simulation ${date.toLocaleString()}`,
  })
  const [nombreEquipement, setNombreEquipement] = useState('0')
  const [dureeDeVie, setDureeDeVie] = useState('0')
  const [heureUtilisation, setHeureUtilisation] = useState('0')

  const modifierNombreEquipement = (event: FormEvent<HTMLInputElement>) => {
    setNombreEquipement(event.currentTarget.value)
  }

  const modifierDureeDeVie = (event: FormEvent<HTMLInputElement>) => {
    setDureeDeVie(event.currentTarget.value)
  }

  const modifierHeureUtilisation = (event: FormEvent<HTMLInputElement>) => {
    setHeureUtilisation(event.currentTarget.value)
  }

  const creerUneSimulation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const nouveauNomInventaire = formData.get('nouveauNomInventaire') as string
    const nomEtablissement = formData.get('nomEtablissement') as string
    const nombreEquipement = formData.get('nombreEquipement') as string
    const dureeDeVie = formData.get('dureeDeVie') as string
    const heureUtilisation = formData.get('heureUtilisation') as string

    const nomInventaireExiste = await estCeQueLeNomInventaireExisteAction(nouveauNomInventaire)

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
    dureeDeVie,
    heureUtilisation,
    isDisabled: state.isDisabled,
    isInvalid: state.isInvalid,
    modifierDureeDeVie,
    modifierHeureUtilisation,
    modifierNombreEquipement,
    modifierNouveauNomInventaire,
    nombreEquipement,
    nouveauNomInventaire: state.nouveauNomInventaire,
  }
}


