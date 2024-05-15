import { indicateurImpactEquipementModel } from '@prisma/client'

import { EtapesAcv, IndicateursImpactsEquipements, formaterLaDateEnFrancais, indicateursImpactsEquipementsPresenter } from './sharedPresenter'
import { ProfilAtih } from '../authentification'
import { IndicateurImpactEquipementSommeModel } from '../repositories/indicateursRepository'
import { ReferentielTypeEquipementModel } from '../repositories/typesEquipementsRepository'

export type IndicateurImpactEquipementSomme = Readonly<{
  etapeAcv: `${EtapesAcv}`
  impact: number
  quantite: number
  typeEquipement: string
}>

export type IndicateursClesPresenter = Readonly<{
  dateInventaire: string
  indicateursImpactsEquipementsSommes: ReadonlyArray<IndicateurImpactEquipementSomme>
  indicateursImpactsEquipements: IndicateursImpactsEquipements
  isAdmin: boolean
  referentielsTypesEquipements: ReadonlyArray<string>
}>

export function indicateursClesPresenter(
  referentielsTypesEquipementsModel: ReadonlyArray<ReferentielTypeEquipementModel>,
  indicateursImpactsEquipementsSommesModel: ReadonlyArray<IndicateurImpactEquipementSommeModel>,
  indicateursImpactsEquipementsModel: ReadonlyArray<indicateurImpactEquipementModel>,
  profil: ProfilAtih
): IndicateursClesPresenter {
  const dateInventaire = formaterLaDateEnFrancais(indicateursImpactsEquipementsModel[0].dateInventaire)
  const referentielsTypesEquipements = referentielsTypesEquipementsPresenter(referentielsTypesEquipementsModel)
  const indicateursImpactsEquipementsSommes = indicateursImpactsEquipementsSommesPresenter(
    indicateursImpactsEquipementsSommesModel,
    referentielsTypesEquipements
  )
  const indicateursImpactsEquipements = indicateursImpactsEquipementsPresenter(indicateursImpactsEquipementsModel)

  return {
    dateInventaire,
    indicateursImpactsEquipements,
    indicateursImpactsEquipementsSommes,
    isAdmin: profil.isAdmin,
    referentielsTypesEquipements,
  }
}

function indicateursImpactsEquipementsSommesPresenter(
  indicateursImpactsEquipementsSommesModel: ReadonlyArray<IndicateurImpactEquipementSommeModel>,
  referentielsEquipements: ReadonlyArray<string>
): ReadonlyArray<IndicateurImpactEquipementSomme> {
  return indicateursImpactsEquipementsSommesModel
    .map((indicateurImpactEquipementSommeModel): IndicateurImpactEquipementSomme => {
      return {
        etapeAcv: indicateurImpactEquipementSommeModel.etapeAcv as `${EtapesAcv}`,
        impact: indicateurImpactEquipementSommeModel._sum.impactUnitaire,
        quantite: indicateurImpactEquipementSommeModel._sum.quantite,
        typeEquipement: indicateurImpactEquipementSommeModel.typeEquipement,
      }
    })
    .toSorted(trierParTypeEquipementEtEtapeAcv(referentielsEquipements))
}

function referentielsTypesEquipementsPresenter(referentielsTypesEquipementsModel: ReadonlyArray<ReferentielTypeEquipementModel>): ReadonlyArray<string> {
  return referentielsTypesEquipementsModel.map((referentielTypeEquipementModel): string => referentielTypeEquipementModel.type)
}

function trierParTypeEquipementEtEtapeAcv(referentielsEquipements: ReadonlyArray<string>) {
  return (a: IndicateurImpactEquipementSomme, b: IndicateurImpactEquipementSomme) => {
    let etapeAcvA = '0'
    let etapeAcvB = '0'

    const cyclesDeVie = [
      'FABRICATION',
      'DISTRIBUTION',
      'UTILISATION',
      'FIN_DE_VIE',
    ]

    for (let poids = 0; poids < referentielsEquipements.length; poids++) {
      if (a.typeEquipement === referentielsEquipements[poids]) {
        etapeAcvA = poids.toString()
      }

      if (b.typeEquipement === referentielsEquipements[poids]) {
        etapeAcvB = poids.toString()
      }
    }

    for (let poids = 0; poids < cyclesDeVie.length; poids++) {
      if (a.etapeAcv === cyclesDeVie[poids]) {
        etapeAcvA += poids.toString()
      }

      if (b.etapeAcv === cyclesDeVie[poids]) {
        etapeAcvB += poids.toString()
      }
    }

    if (etapeAcvA > etapeAcvB) {
      return 1
    }

    return -1
  }
}
