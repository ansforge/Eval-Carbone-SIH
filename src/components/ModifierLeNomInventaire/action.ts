'use server'

import { getProfilAtih } from '../../authentification'
import { modifierLeNomInventaireRepository, recupererUnInventaireRepository } from '../../gateways/inventairesRepository'

export async function estCeQueLeNomInventaireExisteAction(nomInventaire: string): Promise<boolean> {
  const profil = await getProfilAtih()

  const inventaire = await recupererUnInventaireRepository(profil.nomEtablissement, nomInventaire)

  if (inventaire) {
    return true
  }

  return false
}

export async function modifierLeNomInventaireAction(ancienNomInventaire: string, nouveauNomInventaire: string): Promise<void> {
  const profil = await getProfilAtih()

  await modifierLeNomInventaireRepository(profil.nomEtablissement, ancienNomInventaire, nouveauNomInventaire)
}
