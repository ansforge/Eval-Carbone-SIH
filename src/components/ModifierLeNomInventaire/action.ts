'use server'

import { getProfilAtih } from '../../authentification'
import { modifierLeNomInventaireRepository } from '../../repositories/inventairesRepository'

export async function modifierLeNomInventaireAction(ancienNomInventaire: string, nouveauNomInventaire: string, nomEtablissement: string): Promise<void> {
  const profil = await getProfilAtih()

  await modifierLeNomInventaireRepository(
    profil.isAdmin ? nomEtablissement : profil.nomEtablissement,
    ancienNomInventaire,
    nouveauNomInventaire
  )
}
