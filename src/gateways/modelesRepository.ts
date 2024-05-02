import { modeleModel } from '@prisma/client'

import prisma from './database'
import { passerATraiteUnInventaireRepository } from './inventairesRepository'

type ApiError = Readonly<{
  code: string
  message: string
  status: number
  timestamp: string
}>

type ApiErrorJava = Readonly<{
  type: string
  title: string
  status: number
  detail: string
  instance: string
  properties: string
}>

export type Modele = Readonly<{
  dureeDeVie: number
  heureUtilisation: number
  modele: string
  quantite: number
  type: string
}>

export async function recupererLesModelesRepository(nomEtablissement: string, nomInventaire: string): Promise<Array<modeleModel>> {
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

  let data = 'nomEquipementPhysique;modele;quantite;nomCourtDatacenter;dateAchat;dateRetrait;type;statut;paysDUtilisation;consoElecAnnuelle;utilisateur;nomSourceDonnee;nomEntite;nbCoeur;nbJourUtiliseAn;goTelecharge;modeUtilisation;tauxUtilisation\n'
  for (const modele of modeles) {
    const dateAchat = new Date()
    dateAchat.setFullYear(dateAchat.getFullYear() - modele.dureeDeVie)

    data += `;${modele.modele};${modele.quantite};;${dateAchat.toISOString().split('T')[0]};${dateRetrait};${modele.type};;France;;;;;;365;;;${modele.heureUtilisation / 24}\n`
  }

  const responseEntrees = await fetch(urlEntrees, {
    body: `-----------------------------40013669463662053215375107514\r\nContent-Disposition: form-data; name="csvEquipementPhysique"; filename="EquipementPhysique.csv"\r\nContent-Type: text/csv\r\n\r\n${data}\n\r\n-----------------------------40013669463662053215375107514--\r\n`,
    headers: {
      'Content-Type': 'multipart/form-data; boundary=---------------------------40013669463662053215375107514',
    },
    method: 'POST',
  })

  if (!responseEntrees.ok) {
    if (responseEntrees.status === 415) {
      const data = await responseEntrees.json() as ApiErrorJava
      throw new Error(`Status: ${responseEntrees.status}, Status text: ${data.detail}`)
    } else {
      const data = await responseEntrees.json() as ApiError
      throw new Error(`Status: ${responseEntrees.status}, Status text: ${data.message}`)
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
    if (responseCalculs.status === 415) {
      const data = await responseCalculs.json() as ApiErrorJava
      throw new Error(`Status: ${responseCalculs.status}, Status text: ${data.detail}`)
    } else {
      const data = await responseCalculs.json() as ApiError
      throw new Error(`Status: ${responseCalculs.status}, Status text: ${data.message}`)
    }
  } else {
    await passerATraiteUnInventaireRepository(nomEtablissement, nomInventaire)
  }
}

export async function supprimerLesModelesRepository(nomEtablissement: string, nomInventaire: string): Promise<void> {
  await prisma.modeleModel.deleteMany({ where: { nomEtablissement, nomInventaire } })
}
