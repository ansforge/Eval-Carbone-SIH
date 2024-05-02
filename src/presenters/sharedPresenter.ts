export enum StatutsInventaire {
  EN_ATTENTE = 'NON CALCULÉ',
  TRAITE = 'CALCULÉ',
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

export function formaterDeuxChiffresApresLaVirgule(chiffre: number): string {
  return Number(chiffre.toFixed(2)).toLocaleString()
}

export function genererUnIdentifiantUnique(): string {
  return crypto.randomUUID()
}

export function formaterLeNomEtablissement(nomEtablissement: string): string {
  return nomEtablissement.split('$$')[0]
}
