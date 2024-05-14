import { inventaireModel } from '@prisma/client'

import prisma from './database'
import { supprimerLesIndicateursImpactsEquipementsRepository } from './indicateursRepository'
import { Modele, calculerEmpreinteRepository, enregistrerLesModelesRepository, recupererLesModelesRepository, supprimerLesModelesRepository } from './modelesRepository'
import { inventairesParPage } from '../configuration'
import { calculerLaDureeDeVie, convertirLeTauxUtilisationEnHeureUtilisation } from '../presenters/sharedPresenter'

export async function recupererLeTotalInventairesRepository(): Promise<number> {
  return prisma.inventaireModel.count()
}

export async function recupererLesInventairesRepository(nomEtablissement: string): Promise<ReadonlyArray<inventaireModel>> {
  return prisma.inventaireModel.findMany({ orderBy: { dateInventaire: 'desc' }, where: { nomEtablissement } })
}

export async function recupererLesInventairesPaginesRepository(pageCourante: number): Promise<ReadonlyArray<inventaireModel>> {
  return prisma.inventaireModel.findMany({
    orderBy: { dateInventaire: 'desc' },
    skip: inventairesParPage * pageCourante,
    take: inventairesParPage,
  })
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

export async function dupliquerUnInventaireRepository(
  nomEtablissement: string,
  ancienNomInventaire: string,
  nouveauNomInventaire: string
): Promise<void> {
  const modeles = await recupererLesModelesRepository(nomEtablissement, ancienNomInventaire)
  const modelesDupliques = modeles.map((modele): Modele => {
    return {
      dureeDeVie: calculerLaDureeDeVie(modele.dateAchat),
      heureUtilisation: convertirLeTauxUtilisationEnHeureUtilisation(modele.tauxUtilisation),
      modele: modele.nom,
      quantite: modele.quantite,
      type: modele.type,
    }
  })

  await creerUnInventaireRepository(nomEtablissement, nouveauNomInventaire, modelesDupliques)
}

export async function passerATraiteUnInventaireRepository(nomEtablissement: string, nomInventaire: string): Promise<void> {
  await prisma.$transaction(async (prisma) => {
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

export async function modifierLeNomInventaireRepository(
  nomEtablissement: string,
  ancienNomInventaire: string,
  nouveauNomInventaire: string
): Promise<void> {
  await prisma.$transaction(async (prisma) => {
    await prisma.inventaireModel.updateMany({
      data: {
        nomInventaire: nouveauNomInventaire,
      },
      where: {
        nomEtablissement,
        nomInventaire: ancienNomInventaire,
      },
    })

    await prisma.modeleModel.updateMany({
      data: {
        nomInventaire: nouveauNomInventaire,
      },
      where: {
        nomEtablissement,
        nomInventaire: ancienNomInventaire,
      },
    })

    await prisma.indicateurImpactEquipementModel.updateMany({
      data: {
        nomInventaire: nouveauNomInventaire,
      },
      where: {
        nomEtablissement,
        nomInventaire: ancienNomInventaire,
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
