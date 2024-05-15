import { indicateurImpactEquipementModel, modeleModel } from '@prisma/client'

import { IndicateursImpactsEquipements, calculerLaDureeDeVie, convertirLeTauxUtilisationEnHeureUtilisation, formaterLaDateEnFrancais, formaterLeNomEtablissement, indicateursImpactsEquipementsPresenter } from './sharedPresenter'

export type TableauComparatifPresenter = Readonly<{
  dateInventaire: string
  dureeDeVieTotale: number
  indicateursImpactsEquipements: IndicateursImpactsEquipements
  lienIndicateursCles: string
  nomEtablissement: string
  nomInventaire: string
  quantiteTotale: number
  tauxUtilisationTotale: number
}>

export function tableauComparatifPresenter(
  indicateursImpactsEquipementsModel: ReadonlyArray<indicateurImpactEquipementModel>,
  modelesCompareModel: ReadonlyArray<modeleModel>,
  nomEtablissement: string,
  nomInventaire: string
): TableauComparatifPresenter {
  const dateInventaire = formaterLaDateEnFrancais(indicateursImpactsEquipementsModel[0].dateInventaire)

  const indicateursImpactsEquipements = indicateursImpactsEquipementsPresenter(indicateursImpactsEquipementsModel)

  const quantiteTotale = modelesCompareModel.reduce((quantiteAccumulee, modeleCompareModel): number => {
    return quantiteAccumulee + modeleCompareModel.quantite
  }, 0)

  const dureeDeVieTotale = modelesCompareModel.reduce((dureeDeVieAccumulee, modeleCompareModel): number => {
    return dureeDeVieAccumulee + (modeleCompareModel.quantite * calculerLaDureeDeVie(modeleCompareModel.dateAchat) / quantiteTotale)
  }, 0)

  const tauxUtilisationTotale = modelesCompareModel.reduce((tauxUtilisationAccumulee, modeleCompareModel): number => {
    return tauxUtilisationAccumulee +
      (modeleCompareModel.quantite * convertirLeTauxUtilisationEnHeureUtilisation(modeleCompareModel.tauxUtilisation) / quantiteTotale)
  }, 0)

  return {
    dateInventaire,
    dureeDeVieTotale,
    indicateursImpactsEquipements,
    lienIndicateursCles: encodeURI(`/indicateurs-cles?nomEtablissement=${nomEtablissement}&nomInventaire=${nomInventaire}`),
    nomEtablissement: formaterLeNomEtablissement(nomEtablissement),
    nomInventaire,
    quantiteTotale,
    tauxUtilisationTotale,
  }
}

