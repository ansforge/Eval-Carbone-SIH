import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react'

import { creerUnInventaireAction, enregistrerUnInventaireNonCalculeAction } from './action'
import { modelesSelectionnes } from './modele'
import { tempsAlerte } from '../../configuration'

type UseInventaire = Readonly<{
  enregistrerUnInventaire: (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => Promise<void>
  isInventaireEnregistre: boolean
  quantiteGlobale: number
  setQuantiteGlobale: Dispatch<SetStateAction<number>>
}>

export function useInventaire(nomEtablissement: string, nomInventaire: string): UseInventaire {
  const router = useRouter()
  const [quantiteGlobale, setQuantiteGlobale] = useState(0)
  const [isInventaireEnregistre, setIsInventaireEnregistre] = useState(false)

  const enregistrerUnInventaireNonCalcule = async () => {
    await enregistrerUnInventaireNonCalculeAction(nomEtablissement, nomInventaire, modelesSelectionnes())

    setIsInventaireEnregistre(true)
    setTimeout(() => {
      setIsInventaireEnregistre(false)
    }, tempsAlerte)
    router.refresh()
  }

  const lancerLeCalcul = async () => {
    setQuantiteGlobale(0)
    await creerUnInventaireAction(nomEtablissement, nomInventaire, modelesSelectionnes())

    const url = new URL('/indicateurs-cles', document.location.href)
    url.searchParams.append('nomEtablissement', nomEtablissement)
    url.searchParams.append('nomInventaire', nomInventaire)
    router.push(url.toString())
    router.refresh()
  }

  const enregistrerUnInventaire = async (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault()

    // @ts-expect-error
    if (event.nativeEvent.submitter?.name === 'enregistrer') {
      await enregistrerUnInventaireNonCalcule()
    } else {
      await lancerLeCalcul()
    }
  }

  useEffect(() => {
    const quantiteGlobale = modelesSelectionnes().reduce((quantiteAccumulee, modele): number => quantiteAccumulee + modele.quantite, 0)
    setQuantiteGlobale(quantiteGlobale)
  }, [])

  return {
    enregistrerUnInventaire,
    isInventaireEnregistre,
    quantiteGlobale,
    setQuantiteGlobale,
  }
}
