import { inventaireModel } from '@prisma/client'

import { supprimerLesIndicateursImpactsEquipementsRepository } from './indicateursRepository'
import { Modele, calculerEmpreinteRepository, enregistrerLesModelesRepository, supprimerLesModelesRepository } from './modelesRepository'
import prisma from '../../prisma/db'

export async function recupererLesInventairesRepository(nomEtablissement: string, isAdmin: boolean): Promise<Array<inventaireModel>> {
  const nomOrganisation = isAdmin ? { startsWith: '%' } : nomEtablissement

  return prisma.inventaireModel.findMany({ orderBy: { dateInventaire: 'desc' }, where: { nomEtablissement: nomOrganisation } })
}

export async function recupererUnInventaireRepository(nomEtablissement: string, nomInventaire: string): Promise<inventaireModel | null> {
  return prisma.inventaireModel.findFirst({ where: { nomEtablissement, nomInventaire } })
}

export async function enregistrerUnInventaireNonCalculeRepository(
  nomEtablissement: string,
  nomInventaire: string,
  modeles: ReadonlyArray<Modele>
): Promise<void> {
  const dateInventaire = await supprimerUnInventaireRepository(nomEtablissement, nomInventaire)

  await enregistrerLesModelesRepository(dateInventaire, nomEtablissement, nomInventaire, modeles)
}

export async function creerUnInventaireRepository(nomEtablissement: string, nomInventaire: string, modeles: ReadonlyArray<Modele>): Promise<void> {
  const dateInventaire = await supprimerUnInventaireRepository(nomEtablissement, nomInventaire)

  const isAjouter = await enregistrerLesModelesRepository(dateInventaire, nomEtablissement, nomInventaire, modeles)

  if (isAjouter) {
    await calculerEmpreinteRepository(nomEtablissement, nomInventaire)
  }
}

export async function passerATraiteUnInventaireRepository(nomEtablissement: string, nomInventaire: string): Promise<void> {
  return prisma.$transaction(async (prisma) => {
    await prisma.inventaireModel.updateMany({
      data: {
        statut: 'TRAITE',
      },
      where: {
        nomEtablissement,
        nomInventaire,
      },
    })
  })
}

export async function supprimerUnInventaireRepository(nomEtablissement: string, nomInventaire: string): Promise<Date> {
  return prisma.$transaction(async (prisma): Promise<Date> => {
    const inventaire = await prisma.inventaireModel.findFirst({
      select: {
        dateInventaire: true,
      },
      where: {
        nomEtablissement,
        nomInventaire,
      },
    })
    await prisma.inventaireModel.deleteMany({ where: { nomEtablissement, nomInventaire } })
    await supprimerLesModelesRepository(nomEtablissement, nomInventaire)
    await supprimerLesIndicateursImpactsEquipementsRepository(nomEtablissement, nomInventaire)

    return inventaire?.dateInventaire ?? new Date()
  })
}
