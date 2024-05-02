'use server'

import { creerUnInventaireRepository, enregistrerUnInventaireNonCalculeRepository } from '../../gateways/inventairesRepository'
import { Modele } from '../../gateways/modelesRepository'

export async function enregistrerUnInventaireNonCalculeAction(nomEtablissement: string, nomInventaire: string, modeles: ReadonlyArray<Modele>): Promise<void> {
  await enregistrerUnInventaireNonCalculeRepository(nomEtablissement, nomInventaire, modeles)
}

export async function creerUnInventaireAction(nomEtablissement: string, nomInventaire: string, modeles: ReadonlyArray<Modele>): Promise<void> {
  await creerUnInventaireRepository(nomEtablissement, nomInventaire, modeles)
}
