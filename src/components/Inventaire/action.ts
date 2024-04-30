'use server'

import { creerUnInventaireRepository, enregistrerUnInventaireNonCalculeRepository } from '../../repository/inventairesRepository'
import { Modele } from '../../repository/modelesRepository'

export async function enregistrerUnInventaireNonCalculeAction(nomEtablissement: string, nomInventaire: string, modeles: ReadonlyArray<Modele>): Promise<void> {
  await enregistrerUnInventaireNonCalculeRepository(nomEtablissement, nomInventaire, modeles)
}

export async function creerUnInventaireAction(nomEtablissement: string, nomInventaire: string, modeles: ReadonlyArray<Modele>): Promise<void> {
  await creerUnInventaireRepository(nomEtablissement, nomInventaire, modeles)
}
