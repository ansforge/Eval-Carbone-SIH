import { modeleModel } from '@prisma/client'

import { calculerLaDureeDeVie, convertirLeTauxUtilisationEnHeureUtilisation, formaterLaDateEnFrancais } from './sharedPresenter'
import { ReferentielTypeEquipementModel } from '../repositories/typesEquipementsRepository'

export type EquipementPresenter = Readonly<{
  dateInventaire: Readonly<Date>
  dureeDeVie: number
  heuresUtilisation: number
  modele: string
  nomInventaire: string
  nomEtablissement: string
  quantite: number
  type: string
}>

export type ListeEquipementsPresenter = Readonly<{
  dateInventaire: string
  equipements: Record<string, ReadonlyArray<EquipementPresenter>>
}>

export function listeEquipementsPresenter(
  referentielsTypesEquipementsModel: ReadonlyArray<ReferentielTypeEquipementModel>,
  modelesModel: ReadonlyArray<modeleModel>
): ListeEquipementsPresenter {
  const equipements: ListeEquipementsPresenter['equipements'] = {}

  for (const modeleModel of modelesModel.toSorted(trierParTypeEquipement(referentielsTypesEquipementsModel))) {
    const ancienModeleModel = equipements[modeleModel.type] ?? []

    equipements[modeleModel.type] = [
      ...ancienModeleModel,
      {
        dateInventaire: modeleModel.dateInventaire,
        dureeDeVie: calculerLaDureeDeVie(modeleModel.dateAchat),
        heuresUtilisation: convertirLeTauxUtilisationEnHeureUtilisation(modeleModel.tauxUtilisation),
        modele: modeleModel.nom,
        nomEtablissement: modeleModel.nomEtablissement,
        nomInventaire: modeleModel.nomInventaire,
        quantite: modeleModel.quantite,
        type: modeleModel.type,
      },
    ]
  }

  const modeles = Object.keys(equipements)
  const dateInventaire = formaterLaDateEnFrancais(equipements[modeles[0]][0].dateInventaire)

  return {
    dateInventaire,
    equipements,
  }
}

function trierParTypeEquipement(referentielsTypesEquipementsModel: ReadonlyArray<ReferentielTypeEquipementModel>) {
  return (a: modeleModel, b: modeleModel) => {
    let typeEquipementA = 0
    let typeEquipementB = 0

    for (let poids = 0; poids < referentielsTypesEquipementsModel.length; poids++) {
      if (a.type === referentielsTypesEquipementsModel[poids].type) {
        typeEquipementA = poids
      }

      if (b.type === referentielsTypesEquipementsModel[poids].type) {
        typeEquipementB = poids
      }
    }

    if (typeEquipementA > typeEquipementB) {
      return 1
    }

    return -1
  }
}
