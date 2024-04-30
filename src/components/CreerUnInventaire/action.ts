'use server'

import { getProfileAtih } from '../../authentification'
import { recupererUnInventaireRepository } from '../../repository/inventairesRepository'

export async function estCeQueLeNomInventaireExisteAction(nomInventaire: string): Promise<boolean> {
  const profile = await getProfileAtih()

  const inventaire = await recupererUnInventaireRepository(profile.nomEtablissement, nomInventaire)

  if (inventaire) {
    return true
  }

  return false
}
