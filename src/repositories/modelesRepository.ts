import { modeleModel } from '@prisma/client'

import prisma from './database'
import { passerATraiteUnInventaireRepository } from './inventairesRepository'
import { ApiError, ApiErrorJava, UnsupportedMediaTypeStatus } from './sharedRepository'

export type Modele = Readonly<{
  dureeDeVie: number
  heureUtilisation: number
  modele: string
  quantite: number
  type: string
}>

export async function recupererLesModelesRepository(nomEtablissement: string, nomInventaire: string): Promise<ReadonlyArray<modeleModel>> {
  return prisma.modeleModel.findMany({ where: { nomEtablissement, nomInventaire } })
}

export async function enregistrerLesModelesRepository(
  dateInventaire: Readonly<Date>,
  nomEtablissement: string,
  nomInventaire: string,
  modeles: ReadonlyArray<Modele>
): Promise<boolean> {
  const dateRetrait = new Date().toISOString().split('T')[0]
  const urlEntrees = new URL(`${process.env.EXPOSITION_DONNEES_ENTREES_URL}/entrees/csv`)
  urlEntrees.searchParams.append('nomLot', nomInventaire)
  urlEntrees.searchParams.append('nomOrganisation', nomEtablissement)
  urlEntrees.searchParams.append('dateLot', dateInventaire.toISOString().split('T')[0])

  const data = ['nomEquipementPhysique;modele;quantite;nomCourtDatacenter;dateAchat;dateRetrait;type;statut;paysDUtilisation;consoElecAnnuelle;utilisateur;nomSourceDonnee;nomEntite;nbCoeur;nbJourUtiliseAn;goTelecharge;modeUtilisation;tauxUtilisation']
  for (const modele of modeles) {
    const dateAchat = new Date()
    dateAchat.setFullYear(dateAchat.getFullYear() - modele.dureeDeVie)

    data.push(`;${modele.modele};${modele.quantite};;${dateAchat.toISOString().split('T')[0]};${dateRetrait};${modele.type};;France;;;;;;365;;;${modele.heureUtilisation / 24}`)
  }
  const fichierCsv = new File([data.join('\n')], 'EquipementPhysique.csv', { type: 'text/csv' })

  const formData = new FormData()
  formData.append('csvEquipementPhysique', fichierCsv)

  const responseEntrees = await fetch(urlEntrees, {
    body: formData,
    method: 'POST',
  })

  if (!responseEntrees.ok) {
    if (responseEntrees.status === UnsupportedMediaTypeStatus) {
      const error = await responseEntrees.json() as ApiErrorJava
      throw new Error(`Status: ${responseEntrees.status}, Status text: ${error.detail}`)
    } else {
      const error = await responseEntrees.json() as ApiError
      throw new Error(`Status: ${responseEntrees.status}, Status text: ${error.message}`)
    }
  } else {
    return true
  }
}

export async function calculerEmpreinteRepository(nomEtablissement: string, nomInventaire: string): Promise<void> {
  const urlCalcul = new URL(`${process.env.EXPOSITION_DONNEES_ENTREES_URL}/entrees/calculs/soumission`)
  urlCalcul.searchParams.append('mode', 'SYNC')

  const responseCalculs = await fetch(urlCalcul, {
    body: JSON.stringify({ nomLot: nomInventaire }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!responseCalculs.ok) {
    if (responseCalculs.status === UnsupportedMediaTypeStatus) {
      const error = await responseCalculs.json() as ApiErrorJava
      throw new Error(`Status: ${responseCalculs.status}, Status text: ${error.detail}`)
    } else {
      const error = await responseCalculs.json() as ApiError
      throw new Error(`Status: ${responseCalculs.status}, Status text: ${error.message}`)
    }
  } else {
    await passerATraiteUnInventaireRepository(nomEtablissement, nomInventaire)
  }
}

export async function supprimerLesModelesRepository(nomEtablissement: string, nomInventaire: string): Promise<void> {
  await prisma.modeleModel.deleteMany({ where: { nomEtablissement, nomInventaire } })
}
