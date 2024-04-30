import { useRouter } from 'next/navigation'
import { SyntheticEvent, useEffect, useState } from 'react'

import { creerUnInventaireAction, enregistrerUnInventaireNonCalculeAction } from './action'
import { modelesSelectionnes } from './modele'

export function useInventaire(nomEtablissement: string, nomInventaire: string) {
  const router = useRouter()
  const [quantiteGlobale, setQuantiteGlobale] = useState<number>(0)
  const [isInventaireEnregistre, setIsInventaireEnregistre] = useState<boolean>(false)

  const enregistrerUnInventaireNonCalcule = async () => {
    await enregistrerUnInventaireNonCalculeAction(nomEtablissement, nomInventaire, modelesSelectionnes())

    setIsInventaireEnregistre(true)
    setTimeout(() => {
      setIsInventaireEnregistre(false)
    }, 5000)
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
