'use server'

import { dupliquerUnInventaireRepository } from '../../repositories/inventairesRepository'

export async function dupliquerUnInventaireAction(nomEtablissement: string, ancienNomInventaire: string, nouveauNomInventaire: string): Promise<void> {
  await dupliquerUnInventaireRepository(nomEtablissement, ancienNomInventaire, nouveauNomInventaire)
}
