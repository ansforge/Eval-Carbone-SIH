'use server'

import { supprimerUnInventaireRepository, isLeNomInventaireUtiliseRepository } from '../../repositories/inventairesRepository'

export async function supprimerInventaireAction(nomEtablissement: string, nomInventaire: string): Promise<void> {
  await supprimerUnInventaireRepository(nomEtablissement, nomInventaire)
}

export async function isLeNomInventaireExisteAction(nomInventaire: string): Promise<boolean> {
  return isLeNomInventaireUtiliseRepository(nomInventaire)
}
