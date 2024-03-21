import { useReducer, useState } from 'react'

import { modelesSelectionnes } from './modele'

export type ModeleReducer = Readonly<{
  id: string
  nomModele: string
  quantite: number
}>

export function useEquipement(setQuantiteGlobale: (quantite: number) => void, modeles: ModeleReducer[]) {
  const [lignesModele, dispatch] = useReducer(modelesReducer, modeles.length === 0 ? [{ id: crypto.randomUUID(), nomModele: 'Unknown', quantite: 0 }] : modeles)
  const [isToggle, setIsToggle] = useState<boolean>(false)

  const toggle = () => {
    setIsToggle(!isToggle)
  }

  const ajouterUnModele = () => {
    dispatch({
      id: crypto.randomUUID(),
      type: 'added',
    })
  }

  const modifierUnModele = (modele: ModeleReducer) => {
    dispatch({
      id: modele.id,
      modele,
      type: 'changed',
    })

    const quantiteGlobale = modelesSelectionnes().reduce((quantiteAccumulee, modele): number => quantiteAccumulee + modele.quantite, 0)
    setQuantiteGlobale(quantiteGlobale)
  }

  const supprimerUnModele = (modeleId: string) => () => {
    dispatch({
      id: modeleId,
      type: 'deleted',
    })
  }

  return {
    ajouterUnModele,
    isToggle,
    lignesModele,
    modifierUnModele,
    supprimerUnModele,
    toggle,
  }
}

type ActionReducer = Readonly<{
  id: string
  modele?: ModeleReducer
  type: string
}>

function modelesReducer(modeles: ModeleReducer[], action: ActionReducer): ModeleReducer[] {
  switch (action.type) {
    case 'added': {
      return [
        ...modeles,
        {
          id: action.id,
          nomModele: 'Unknown',
          quantite: 0,
        },
      ]
    }
    case 'deleted': {
      return modeles.filter((modele): boolean => modele.id !== action.id)
    }
    case 'changed': {
      return modeles.map((modele: ModeleReducer): ModeleReducer => {
        if (modele.id === action.id) {
          return action.modele as ModeleReducer
        } else {
          return modele
        }
      })
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
