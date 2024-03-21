import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

import { creerUnInventaireAction, enregistrerUnInventaireNonCalculeAction } from './action'
import { modelesSelectionnes } from './modele'

export function useInventaire(nomInventaire: string) {
  const router = useRouter()
  const [quantiteGlobale, setQuantiteGlobale] = useState<number>(0)
  const [isInventaireEnregistre, setIsInventaireEnregistre] = useState<boolean>(false)

  const enregistrerUnInventaireNonCalcule = async () => {
    await enregistrerUnInventaireNonCalculeAction(nomInventaire, modelesSelectionnes())

    setIsInventaireEnregistre(true)
    setTimeout(() => {
      setIsInventaireEnregistre(false)
    }, 5000)
    router.refresh()
  }

  const lancerLeCalcul = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setQuantiteGlobale(0)
    await creerUnInventaireAction(nomInventaire, modelesSelectionnes())

    const url = new URL('/indicateurs-cles', document.location.href)
    url.searchParams.append('nomInventaire', nomInventaire)
    router.push(url.toString())
    router.refresh()
  }

  useEffect(() => {
    const quantiteGlobale = modelesSelectionnes().reduce((quantiteAccumulee, modele): number => quantiteAccumulee + modele.quantite, 0)
    setQuantiteGlobale(quantiteGlobale)
  }, [])

  return {
    enregistrerUnInventaireNonCalcule,
    isInventaireEnregistre,
    lancerLeCalcul,
    quantiteGlobale,
    setQuantiteGlobale,
  }
}
