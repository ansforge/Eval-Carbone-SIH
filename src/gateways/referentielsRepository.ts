import { correspondanceTypeEquipementModeleModel } from '@prisma/client'

import prisma from './database'
import { ApiError, ApiErrorJava, UnsupportedMediaTypeStatus } from './sharedRepository'

export async function modifierUnReferentielRepository(formData: FormData): Promise<void> {
  const fichierReferentiel = formData.get('fichierReferentiel') as File

  if (fichierReferentiel.name === 'correspondanceTypeEquipement.csv') {
    const correspondancesTypeEquipement = (await fichierReferentiel.text())
      .split('\r\n').map((ligne): correspondanceTypeEquipementModeleModel => {
        const splittedLigne = ligne.split(';')

        return {
          modeleId: splittedLigne[1],
          typeEquipementId: splittedLigne[0],
        }
      })
      .slice(1, -1)
    await enregistrerCorrespondancesTypeEquipementRepository(correspondancesTypeEquipement)
  } else {
    formData.append('file', fichierReferentiel)

    const url = new URL(`${process.env.REFERENTIELS_URL}/referentiel/${fichierReferentiel.name.replace('.csv', '')}/csv`)

    const responseCalculs = await fetch(url, {
      body: formData,
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
    }
  }
}

async function enregistrerCorrespondancesTypeEquipementRepository(
  correspondancesTypeEquipement: Array<correspondanceTypeEquipementModeleModel>
): Promise<void> {
  await prisma.$transaction(async (prisma) => {
    await supprimerCorrespondanceTypeEquipementRepository()

    await prisma.correspondanceTypeEquipementModeleModel.createMany({
      data: correspondancesTypeEquipement,
    })
  })
}

async function supprimerCorrespondanceTypeEquipementRepository(): Promise<void> {
  await prisma.correspondanceTypeEquipementModeleModel.deleteMany({})
}
