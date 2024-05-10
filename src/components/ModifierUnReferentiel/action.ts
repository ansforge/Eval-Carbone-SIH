'use server'

import { modifierUnReferentielRepository } from '../../repositories/referentielsRepository'

export async function modifierUnReferentielAction(fichierReferentiel: FormData): Promise<void> {
  await modifierUnReferentielRepository(fichierReferentiel)
}
