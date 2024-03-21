'use server'

import { getProfileAtih } from '../../authentification'
import { supprimerInventaireRepository } from '../../repository/inventairesRepository'

export async function supprimerInventaireAction(nomInventaire: string) {
  const profile = await getProfileAtih()

  await supprimerInventaireRepository(profile.nomEtablissement, nomInventaire)
}
