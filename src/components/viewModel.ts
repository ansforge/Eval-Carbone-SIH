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

export type EquipementsAvecSesModelesViewModel = Readonly<{
  dateInventaire: Date
  modeles: ModeleReducer[]
  type: string
}>

export type EquipementsViewModel = Readonly<{
  [key: string]: EquipementViewModel[]
}>

export type EquipementViewModel = Readonly<{
  dateInventaire: Date
  modele: string
  nomInventaire: string
  nomEtablissement: string
  quantite: number
  type: keyof typeof TypesEquipements
}>

export type NomModeleViewModel = Readonly<{
  modele: string
}>

export type IndicateursViewModel = Readonly<{
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

export type IndicateursSommesViewModel = Readonly<{
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

export enum TypesEquipements {
  'Cashing System' = 'x1',
  'Cash registered device' = 'x2',
  'Communication Device' = 'x3',
  'Consumable' = 'x4',
  'Invoice terminal' = 'x5',
  'IP Router' = 'x6',
  'IP Switch' = 'x7',
  'Mobility Device' = 'x8',
  'Monitor' = 'Écran d’ordinateur',
  'Network Gear' = 'x9',
  'Network Load Balancer' = 'x10',
  'Personal Computer' = 'Ordinateur fixe - sans écran',
  'Plotter' = 'x11',
  'Printer' = 'Imprimante',
  'Self Check Out' = 'x12',
  'Server' = 'Serveur',
  'Smartphone' = 'Téléphone portable',
  'Tracer' = 'Antenne',
}

export enum TypesEquipements2 {
  'Baie de stockage' = 'x1',
  'Baie NAS' = 'x2',
  'Commutateur réseau' = 'x3',
  'écran' = 'x4',
  'Ordinateur fixe (sans écran)' = 'x5',
  'Ordinateur portable' = 'x6',
  'Serveur rack' = 'x7',
}

export function tolowerCase(text: string): string {
  return (text[0] + text.slice(1).toLowerCase()).replaceAll('_', ' ')
}
