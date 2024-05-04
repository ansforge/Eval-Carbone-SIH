'use server'

import { modifierUnReferentielRepository } from '../../gateways/referentielsRepository'

export async function modifierUnReferentielAction(fichierReferentiel: FormData): Promise<void> {
  await modifierUnReferentielRepository(fichierReferentiel)
}
