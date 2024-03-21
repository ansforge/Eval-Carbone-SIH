import { ref_correspondance_ref_eqp } from '@prisma/client'

import prisma from '../../prisma/db'

export async function recupererNomsModelesRepository(): Promise<ref_correspondance_ref_eqp[]> {
  return await prisma.ref_correspondance_ref_eqp.findMany({ orderBy: { modele_equipement_source: 'asc' } })
}
