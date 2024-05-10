'use server'

import { getProfilAtih } from '../../authentification'
import { supprimerUnInventaireRepository, recupererUnInventaireRepository } from '../../repositories/inventairesRepository'

export async function supprimerInventaireAction(nomEtablissement: string, nomInventaire: string): Promise<void> {
  await supprimerUnInventaireRepository(nomEtablissement, nomInventaire)
}

export async function isLeNomInventaireExisteAction(nomInventaire: string, nomEtablissement = 'admin'): Promise<boolean> {
  const profil = await getProfilAtih()

  const inventaire = await recupererUnInventaireRepository(
    profil.isAdmin ? nomEtablissement : profil.nomEtablissement,
    nomInventaire
  )

  if (inventaire) {
    return true
  }

  return false
}
