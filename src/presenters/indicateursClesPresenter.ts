import { indicateurImpactEquipementModel } from '@prisma/client'

import { IndicateurImpactEquipementSommeModel } from '../repository/indicateursRepository'
import { ReferentielTypeEquipementModel } from '../repository/typesEquipementsRepository'

type IndicateursImpactsEquipements = Readonly<{
  acidification: string
  distribution: string
  emissionsDeParticulesFines: string
  empreinteCarbone: string
  epuisementDesRessources: string
  fabrication: string
  finDeVie: string
  radiationIonisantes: string
  utilisation: string
  kilometresEnVoiture: string
}>

export type IndicateurImpactEquipementSomme = Readonly<{
  etapeAcv: `${EtapesAcv}`
  impact: number
  typeEquipement: string
}>

export type IndicateursClesPresenter = Readonly<{
  dateInventaire: string
  indicateursImpactsEquipementsSommes: ReadonlyArray<IndicateurImpactEquipementSomme>
  indicateursImpactsEquipements: IndicateursImpactsEquipements
  referentielsTypesEquipements: ReadonlyArray<string>
}>

export enum EtapesAcv {
  fabrication = 'FABRICATION',
  distribution = 'DISTRIBUTION',
  utilisation = 'UTILISATION',
  finDeVie = 'FIN_DE_VIE',
}

enum Criteres {
  radiationIonisantes = 'Ionising radiation',
  epuisementDesRessources = 'Resource use (minerals and metals)',
  emissionsDeParticulesFines = 'Particulate matter and respiratory inorganics',
  acidification = 'Acidification',
  empreinteCarbone = 'Climate change',
}

export function indicateursClesPresenter(
  referentielsTypesEquipementsModel: ReadonlyArray<ReferentielTypeEquipementModel>,
  indicateursImpactsEquipementsSommesModel: ReadonlyArray<IndicateurImpactEquipementSommeModel>,
  indicateursImpactsEquipementsModel: ReadonlyArray<indicateurImpactEquipementModel>
): IndicateursClesPresenter {
  const dateInventaire = indicateursImpactsEquipementsModel[0].dateInventaire.toLocaleDateString('fr-FR')
  const referentielsTypesEquipements = referentielsTypesEquipementsPresenter(referentielsTypesEquipementsModel)
  const indicateursImpactsEquipementsSommes = indicateursImpactsEquipementsSommesPresenter(
    indicateursImpactsEquipementsSommesModel,
    referentielsTypesEquipements
  )
  const indicateursImpactsEquipements = indicateursImpactsEquipementsPresenter(indicateursImpactsEquipementsModel)

  return {
    dateInventaire,
    indicateursImpactsEquipements,
    indicateursImpactsEquipementsSommes,
    referentielsTypesEquipements,
  }
}

export function toLowerCase(text: string): string {
  return (text[0] + text.slice(1).toLowerCase()).replaceAll('_', ' ')
}

function indicateursImpactsEquipementsPresenter(
  indicateursImpactsEquipementsModel: ReadonlyArray<indicateurImpactEquipementModel>
): IndicateursImpactsEquipements {
  let radiationIonisantes = 0
  let epuisementDesRessources = 0
  let emissionsDeParticulesFines = 0
  let acidification = 0
  let empreinteCarbone = 0
  let fabrication = 0
  let distribution = 0
  let utilisation = 0
  let finDeVie = 0
  const kilometresEquivalent1TonneCO2 = 5181

  for (const indicateurImpactEquipementModel of indicateursImpactsEquipementsModel) {
    const critere = indicateurImpactEquipementModel.critere as Criteres
    const etapeacv = indicateurImpactEquipementModel.etapeAcv as EtapesAcv

    if (critere === Criteres.radiationIonisantes) {
      radiationIonisantes += indicateurImpactEquipementModel.impactUnitaire
    } else if (critere === Criteres.epuisementDesRessources) {
      epuisementDesRessources += indicateurImpactEquipementModel.impactUnitaire
    } else if (critere === Criteres.emissionsDeParticulesFines) {
      emissionsDeParticulesFines += indicateurImpactEquipementModel.impactUnitaire
    } else if (critere === Criteres.acidification) {
      acidification += indicateurImpactEquipementModel.impactUnitaire
    } else {
      empreinteCarbone += indicateurImpactEquipementModel.impactUnitaire / 1000

      if (etapeacv === EtapesAcv.fabrication) {
        fabrication += indicateurImpactEquipementModel.impactUnitaire / 1000
      } else if (etapeacv === EtapesAcv.distribution) {
        distribution += indicateurImpactEquipementModel.impactUnitaire / 1000
      } else if (etapeacv === EtapesAcv.utilisation) {
        utilisation += indicateurImpactEquipementModel.impactUnitaire / 1000
      } else {
        finDeVie += indicateurImpactEquipementModel.impactUnitaire / 1000
      }
    }
  }

  return {
    acidification: deuxChiffresApresLaVirgule(acidification),
    distribution: deuxChiffresApresLaVirgule(distribution),
    emissionsDeParticulesFines: deuxChiffresApresLaVirgule(emissionsDeParticulesFines),
    empreinteCarbone: deuxChiffresApresLaVirgule(empreinteCarbone),
    epuisementDesRessources: deuxChiffresApresLaVirgule(epuisementDesRessources),
    fabrication: deuxChiffresApresLaVirgule(fabrication),
    finDeVie: deuxChiffresApresLaVirgule(finDeVie),
    kilometresEnVoiture: Math.round(empreinteCarbone * kilometresEquivalent1TonneCO2).toLocaleString(),
    radiationIonisantes: deuxChiffresApresLaVirgule(radiationIonisantes),
    utilisation: deuxChiffresApresLaVirgule(utilisation),
  }
}

function indicateursImpactsEquipementsSommesPresenter(
  indicateursImpactsEquipementsSommesModel: ReadonlyArray<IndicateurImpactEquipementSommeModel>,
  referentielsEquipements: Array<string>
): Array<IndicateurImpactEquipementSomme> {
  return indicateursImpactsEquipementsSommesModel
    .map((indicateurImpactEquipementSommeModel): IndicateurImpactEquipementSomme => {
      return {
        etapeAcv: indicateurImpactEquipementSommeModel.etapeAcv as `${EtapesAcv}`,
        impact: indicateurImpactEquipementSommeModel._sum.impactUnitaire,
        typeEquipement: indicateurImpactEquipementSommeModel.typeEquipement,
      }
    })
    .sort(sortByTypeEquipementAndEtapeAcv(referentielsEquipements))
}

function referentielsTypesEquipementsPresenter(
  referentielsTypesEquipementsModel: ReadonlyArray<ReferentielTypeEquipementModel>
): Array<string> {
  return referentielsTypesEquipementsModel.map((referentielTypeEquipementModel): string => referentielTypeEquipementModel.type)
}

function deuxChiffresApresLaVirgule(chiffre: number): string {
  return Number(chiffre.toFixed(2)).toLocaleString()
}

function sortByTypeEquipementAndEtapeAcv(referentielsEquipements: Array<string>) {
  return (a: IndicateurImpactEquipementSomme, b: IndicateurImpactEquipementSomme) => {
    let etapeAcvA = '0'
    let etapeAcvB = '0'

    const cyclesDeVie = [
      'FABRICATION',
      'DISTRIBUTION',
      'UTILISATION',
      'FIN_DE_VIE',
    ]

    for (let poids = 0; poids < referentielsEquipements.length; poids++) {
      if (a.typeEquipement === referentielsEquipements[poids]) {
        etapeAcvA = poids.toString()
      }

      if (b.typeEquipement === referentielsEquipements[poids]) {
        etapeAcvB = poids.toString()
      }
    }

    for (let poids = 0; poids < cyclesDeVie.length; poids++) {
      if (a.etapeAcv === cyclesDeVie[poids]) {
        etapeAcvA += poids.toString()
      }

      if (b.etapeAcv === cyclesDeVie[poids]) {
        etapeAcvB += poids.toString()
      }
    }

    if (etapeAcvA > etapeAcvB) {
      return 1
    }

    if (etapeAcvA < etapeAcvB) {
      return -1
    }

    return 0
  }
}
