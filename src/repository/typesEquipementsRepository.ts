import prisma from '../../prisma/db'

export type ReferentielTypeEquipementModel = Readonly<{
  dureeDeVie: number
  modeles: ReadonlyArray<{
    relationModeles: Readonly<{
      nom: string
    }>
  }>
  type: string
}>

export async function recupererLesReferentielsTypesEquipementsRepository(): Promise<Array<ReferentielTypeEquipementModel>> {
  return prisma.referentielTypeEquipementModel.findMany({
    select: {
      dureeDeVie: true,
      modeles: {
        select: {
          relationModeles: {
            select: {
              nom: true,
            },
          },
        },
      },
      type: true,
    },
  })
}
