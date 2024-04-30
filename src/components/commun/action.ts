'use server'

import { supprimerUnInventaireRepository } from '../../repository/inventairesRepository'

export async function supprimerInventaireAction(nomEtablissement: string, nomInventaire: string): Promise<void> {
  await supprimerUnInventaireRepository(nomEtablissement, nomInventaire)
}
