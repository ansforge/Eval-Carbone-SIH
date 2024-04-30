'use server'

import { supprimerInventaireRepository } from '../../repository/inventairesRepository'

export async function supprimerInventaireAction(nomEtablissement: string, nomInventaire: string) {
  await supprimerInventaireRepository(nomEtablissement, nomInventaire)
}
