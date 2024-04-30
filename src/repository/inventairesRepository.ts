import { en_donnees_entrees } from '@prisma/client'

import { supprimerEquipementsPhysiquesRepository } from './equipementsRepository'
import { supprimerIndicateursEquipementsPhysiquesRepository } from './indicateursRepository'
import prisma from '../../prisma/db'

export async function recupererInventairesRepository(nomEtablissement: string, isAdmin: boolean): Promise<en_donnees_entrees[]> {
  const nomOrganisation = isAdmin ? { startsWith: '%' } : nomEtablissement

  return await prisma.en_donnees_entrees.findMany({ orderBy: { date_lot: 'desc' }, where: { nom_organisation: nomOrganisation } })
}

export async function recupererInventaireRepository(nomEtablissement: string, nomInventaire: string): Promise<en_donnees_entrees | null> {
  return await prisma.en_donnees_entrees.findFirst({ where: { nom_lot: nomInventaire, nom_organisation: nomEtablissement } })
}

export async function miseAJourInventaireRepository(nomEtablissement: string, nomInventaire: string) {
  return prisma.$transaction(async (prisma) => {
    await prisma.en_donnees_entrees.updateMany({
      data: {
        statut_traitement: 'TRAITE',
      },
      where: {
        nom_lot: nomInventaire,
        nom_organisation: nomEtablissement,
      },
    })
  })
}

export async function supprimerInventaireRepository(nomEtablissement: string, nomInventaire: string): Promise<Date> {
  return prisma.$transaction(async (prisma): Promise<Date> => {
    const inventaire = await prisma.en_donnees_entrees.findFirst({
      select: {
        date_lot: true,
      },
      where: {
        nom_lot: nomInventaire,
        nom_organisation: nomEtablissement,
      },
    })
    await prisma.en_donnees_entrees.deleteMany({ where: { nom_lot: nomInventaire, nom_organisation: nomEtablissement } })
    await supprimerEquipementsPhysiquesRepository(nomEtablissement, nomInventaire)
    await supprimerIndicateursEquipementsPhysiquesRepository(nomEtablissement, nomInventaire)

    return inventaire?.date_lot ?? new Date()
  })
}
