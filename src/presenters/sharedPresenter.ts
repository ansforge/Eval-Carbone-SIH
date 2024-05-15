import { indicateurImpactEquipementModel } from '@prisma/client'

import { separator } from '../configuration'

export type IndicateursImpactsEquipements = Readonly<{
  acidification: number
  distribution: number
  emissionsDeParticulesFines: number
  empreinteCarbone: number
  epuisementDesRessources: number
  fabrication: number
  finDeVie: number
  kilometresEnVoiture: string
  radiationIonisantes: number
  utilisation: number
}>

export enum StatutsInventaire {
  EN_ATTENTE = 'NON CALCULÉ',
  TRAITE = 'CALCULÉ',
}

export enum Criteres {
  radiationIonisantes = 'Ionising radiation',
  epuisementDesRessources = 'Resource use (minerals and metals)',
  emissionsDeParticulesFines = 'Particulate matter and respiratory inorganics',
  acidification = 'Acidification',
  empreinteCarbone = 'Climate change',
}

export enum EtapesAcv {
  fabrication = 'FABRICATION',
  distribution = 'DISTRIBUTION',
  utilisation = 'UTILISATION',
  finDeVie = 'FIN_DE_VIE',
}

export function convertirLeTauxUtilisationEnHeureUtilisation(tauxUtilisation: number): number {
  return Math.round(tauxUtilisation * 24)
}

export function calculerLaDureeDeVie(dateAchat: Readonly<Date>): number {
  return new Date().getFullYear() - dateAchat.getFullYear()
}

export function mettreEnBasDeCasse(text: string): string {
  return (text[0] + text.slice(1).toLowerCase()).replaceAll('_', ' ')
}

export function formaterLaDateEnFrancais(date: Readonly<Date>): string {
  return date.toLocaleDateString('fr-FR')
}

export function formaterEnIdentifiant(text: string): string {
  return text.replaceAll(' ', '-')
}

export function formaterDeuxChiffresApresLaVirgule(chiffre: number): string {
  return Number(chiffre.toFixed(2)).toLocaleString('fr-FR')
}

export function genererUnIdentifiantUnique(): string {
  return crypto.randomUUID()
}

export function formaterLeNomEtablissement(nomEtablissement: string): string {
  return nomEtablissement.split(separator)[0]
}

export function indicateursImpactsEquipementsPresenter(
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
    acidification,
    distribution,
    emissionsDeParticulesFines,
    empreinteCarbone,
    epuisementDesRessources,
    fabrication,
    finDeVie,
    kilometresEnVoiture: Math.round(empreinteCarbone * kilometresEquivalent1TonneCO2).toLocaleString('fr-FR'),
    radiationIonisantes,
    utilisation,
  }
}
