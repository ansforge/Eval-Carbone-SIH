'use server'

import { EquipementPhysique, creerUnInventaireRepository, enregistrerUnInventaireNonCalculeRepository } from '../../repository/equipementsRepository'

export async function enregistrerUnInventaireNonCalculeAction(nomEtablissement: string, nomInventaire: string, modeles: EquipementPhysique[]) {
  await enregistrerUnInventaireNonCalculeRepository(nomEtablissement, nomInventaire, modeles)
}

export async function creerUnInventaireAction(nomEtablissement: string, nomInventaire: string, modeles: EquipementPhysique[]) {
  await creerUnInventaireRepository(nomEtablissement, nomInventaire, modeles)
}
