import { ind_indicateur_impact_equipement_physique } from '@prisma/client'

import prisma from '../../prisma/db'

export type IndicateursSommesModel = Readonly<{
  _sum: Readonly<{
    impact_unitaire: number
  }>
  etapeacv: string
  type_equipement: string
}>

export async function recupererIndicateursEquipementsPhysiquesRepository(
  nomEtablissement: string,
  nomInventaire: string
): Promise<ind_indicateur_impact_equipement_physique[]> {
  return await prisma.ind_indicateur_impact_equipement_physique.findMany({
    where: {
      nom_lot: nomInventaire,
      nom_organisation: nomEtablissement,
      statut_indicateur: 'OK',
    },
  })
}

export async function recupererIndicateursEquipementsPhysiquesSommesRepository(
  nomEtablissement: string,
  nomInventaire: string
): Promise<IndicateursSommesModel[]> {
  // @ts-ignore
  return await prisma.ind_indicateur_impact_equipement_physique.groupBy({
    _sum: {
      impact_unitaire: true,
    },
    by: ['type_equipement', 'etapeacv'],
    where: {
      nom_lot: nomInventaire,
      nom_organisation: nomEtablissement,
      statut_indicateur: 'OK',
    },
  })
}

export async function supprimerIndicateursEquipementsPhysiquesRepository(nomEtablissement: string, nomInventaire: string) {
  await prisma.ind_indicateur_impact_equipement_physique.deleteMany({ where: { nom_lot: nomInventaire, nom_organisation: nomEtablissement } })
}
