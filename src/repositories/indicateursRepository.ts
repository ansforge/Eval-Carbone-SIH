import { indicateurImpactEquipementModel } from '@prisma/client'

import prisma from './database'

export type IndicateurImpactEquipementSommeModel = Readonly<{
  _sum: Readonly<{
    impactUnitaire: number
  }>
  etapeAcv: string
  typeEquipement: string
}>

export async function recupererTousLesIndicateursImpactsEquipementsRepository(): Promise<Array<indicateurImpactEquipementModel>> {
  return prisma.indicateurImpactEquipementModel.findMany()
}

export async function recupererLesIndicateursImpactsEquipementsRepository(
  nomEtablissement: string,
  nomInventaire: string
): Promise<Array<indicateurImpactEquipementModel>> {
  return prisma.indicateurImpactEquipementModel.findMany({
    where: {
      nomEtablissement,
      nomInventaire,
      statutIndicateur: 'OK',
    },
  })
}

export async function recupererLesIndicateursImpactsEquipementsSommesRepository(
  nomEtablissement: string,
  nomInventaire: string
): Promise<Array<IndicateurImpactEquipementSommeModel>> {
  // @ts-expect-error
  return prisma.indicateurImpactEquipementModel.groupBy({
    _sum: {
      impactUnitaire: true,
    },
    by: ['typeEquipement', 'etapeAcv'],
    where: {
      critere: 'Climate change',
      nomEtablissement,
      nomInventaire,
      statutIndicateur: 'OK',
    },
  })
}

export async function supprimerLesIndicateursImpactsEquipementsRepository(nomEtablissement: string, nomInventaire: string): Promise<void> {
  await prisma.indicateurImpactEquipementModel.deleteMany({ where: { nomEtablissement, nomInventaire } })
}
