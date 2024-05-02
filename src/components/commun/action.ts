'use server'

import { supprimerUnInventaireRepository } from '../../gateways/inventairesRepository'

export async function supprimerInventaireAction(nomEtablissement: string, nomInventaire: string): Promise<void> {
  await supprimerUnInventaireRepository(nomEtablissement, nomInventaire)
}
