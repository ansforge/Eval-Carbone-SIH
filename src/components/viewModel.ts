import { ModeleReducer } from './Inventaire/useEquipement'

export type InventaireViewModel = Readonly<{
  className: string
  dateInventaire: string
  id: number
  link: string
  nomInventaire: string
  nomEtablissement: string
  statut: StatutsInventaire
}>

export type InventairesViewModel = ReadonlyArray<InventaireViewModel>

export type EquipementAvecSesModelesViewModel = Readonly<{
  modeles: Array<ModeleReducer>
  type: string
}>

export type EquipementsViewModel = Readonly<
  Record<string, ReadonlyArray<EquipementViewModel>>
>

export type EquipementViewModel = Readonly<{
  dateInventaire: Readonly<Date>
  modele: string
  nomInventaire: string
  nomEtablissement: string
  quantite: number
  type: string
}>

export type IndicateursImpactsEquipementsViewModel = Readonly<{
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

export type IndicateurImpactEquipementSommeViewModel = Readonly<{
  etapeAcv: `${EtapesAcv}`
  impact: number
  typeEquipement: string
}>

export enum StatutsInventaire {
  EN_ATTENTE = 'NON CALCULÉ',
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

export function toLowerCase(text: string): string {
  return (text[0] + text.slice(1).toLowerCase()).replaceAll('_', ' ')
}
