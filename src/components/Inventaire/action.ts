'use server'

import { getProfileAtih } from '../../authentification'
import { EquipementPhysique, creerUnInventaireRepository, enregistrerUnInventaireNonCalculeRepository } from '../../repository/equipementsRepository'

export async function enregistrerUnInventaireNonCalculeAction(nomInventaire: string, modeles: EquipementPhysique[]) {
  const profile = await getProfileAtih()

  await enregistrerUnInventaireNonCalculeRepository(profile.nomEtablissement, nomInventaire, modeles)
}

export async function creerUnInventaireAction(nomInventaire: string, modeles: EquipementPhysique[]) {
  const profile = await getProfileAtih()

  await creerUnInventaireRepository(profile.nomEtablissement, nomInventaire, modeles)
}
