'use server'

import { getProfilAtih } from '../../authentification'
import { recupererUnInventaireRepository } from '../../gateways/inventairesRepository'

export async function estCeQueLeNomInventaireExisteAction(nomInventaire: string): Promise<boolean> {
  const profil = await getProfilAtih()

  const inventaire = await recupererUnInventaireRepository(profil.nomEtablissement, nomInventaire)

  if (inventaire) {
    return true
  }

  return false
}
