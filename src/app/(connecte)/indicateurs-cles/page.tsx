import { indicateurImpactEquipementModel } from '@prisma/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import IndicateursCles from '../../../components/IndicateursCles/IndicateursCles'
import { Criteres, EtapesAcv, IndicateurImpactEquipementSommeViewModel, IndicateursImpactsEquipementsViewModel } from '../../../components/viewModel'
import { IndicateurImpactEquipementSommeModel, recupererLesIndicateursImpactsEquipementsRepository, recupererLesIndicateursImpactsEquipementsSommesRepository } from '../../../repository/indicateursRepository'
import { recupererLesReferentielsTypesEquipementsRepository, ReferentielTypeEquipementModel } from '../../../repository/typesEquipementsRepository'

const title = 'Indicateurs clés'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams: Readonly<{
    nomEtablissement?: string
    nomInventaire?: string
  }>
}>

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  if (searchParams.nomEtablissement === undefined || searchParams.nomInventaire === undefined) {
    notFound()
  }

  const profile = await getProfileAtih()

  if (!profile.isAdmin && profile.nomEtablissement !== searchParams.nomEtablissement) {
    notFound()
  }

  const indicateursImpactsEquipementsModel = await recupererLesIndicateursImpactsEquipementsRepository(
    searchParams.nomEtablissement,
    searchParams.nomInventaire
  )

  if (indicateursImpactsEquipementsModel.length === 0) {
    notFound()
  }

  const indicateursImpactsEquipementsSommesModel = await recupererLesIndicateursImpactsEquipementsSommesRepository(
    searchParams.nomEtablissement,
    searchParams.nomInventaire
  )

  const referentielsTypesEquipementsModel = await recupererLesReferentielsTypesEquipementsRepository()

  const referentielsTypesEquipementsViewModel = tranformerLesReferentielsTypesEquipementsModelEnViewModel(referentielsTypesEquipementsModel)

  const indicateursImpactsEquipementsSommesViewModel = transformerLesIndicateursImpactsEquipementsSommesModelEnViewModel(
    indicateursImpactsEquipementsSommesModel,
    referentielsTypesEquipementsViewModel
  )

  const indicateursImpactsEquipementsViewModel = transformerLesIndicateursImpactsEquipementsModelEnViewModel(indicateursImpactsEquipementsModel)

  const dateInventaire = indicateursImpactsEquipementsModel[0].dateInventaire.toLocaleDateString('fr-FR')

  return (
    <>
      <Breadcrumb label={title} />
      <IndicateursCles
        dateInventaire={dateInventaire}
        indicateursImpactsEquipementsSommesViewModel={indicateursImpactsEquipementsSommesViewModel}
        indicateursImpactsEquipementsViewModel={indicateursImpactsEquipementsViewModel}
        nomEtablissement={searchParams.nomEtablissement}
        nomInventaire={searchParams.nomInventaire}
        referentielsTypesEquipementsViewModel={referentielsTypesEquipementsViewModel}
      />
    </>
  )
}

function transformerLesIndicateursImpactsEquipementsModelEnViewModel(
  indicateursImpactsEquipementsModel: Array<indicateurImpactEquipementModel>
): IndicateursImpactsEquipementsViewModel {
  let radiationIonisantes = 0
  let epuisementDesRessources = 0
  let emissionsDeParticulesFines = 0
  let acidification = 0
  let empreinteCarbone = 0
  let fabrication = 0
  let distribution = 0
  let utilisation = 0
  let finDeVie = 0
  const kilometresEquivalent1TonneCO2 = 5181

  for (const indicateurImpactEquipementModel of indicateursImpactsEquipementsModel) {
    const critere = indicateurImpactEquipementModel.critere as Criteres
    const etapeacv = indicateurImpactEquipementModel.etapeAcv as EtapesAcv

    if (critere === Criteres.radiationIonisantes) {
      radiationIonisantes += indicateurImpactEquipementModel.impactUnitaire
    } else if (critere === Criteres.epuisementDesRessources) {
      epuisementDesRessources += indicateurImpactEquipementModel.impactUnitaire
    } else if (critere === Criteres.emissionsDeParticulesFines) {
      emissionsDeParticulesFines += indicateurImpactEquipementModel.impactUnitaire
    } else if (critere === Criteres.acidification) {
      acidification += indicateurImpactEquipementModel.impactUnitaire
    } else {
      empreinteCarbone += indicateurImpactEquipementModel.impactUnitaire / 1000

      if (etapeacv === EtapesAcv.fabrication) {
        fabrication += indicateurImpactEquipementModel.impactUnitaire / 1000
      } else if (etapeacv === EtapesAcv.distribution) {
        distribution += indicateurImpactEquipementModel.impactUnitaire / 1000
      } else if (etapeacv === EtapesAcv.utilisation) {
        utilisation += indicateurImpactEquipementModel.impactUnitaire / 1000
      } else {
        finDeVie += indicateurImpactEquipementModel.impactUnitaire / 1000
      }
    }
  }

  return {
    acidification: deuxChiffresApresLaVirgule(acidification),
    distribution: deuxChiffresApresLaVirgule(distribution),
    emissionsDeParticulesFines: deuxChiffresApresLaVirgule(emissionsDeParticulesFines),
    empreinteCarbone: deuxChiffresApresLaVirgule(empreinteCarbone),
    epuisementDesRessources: deuxChiffresApresLaVirgule(epuisementDesRessources),
    fabrication: deuxChiffresApresLaVirgule(fabrication),
    finDeVie: deuxChiffresApresLaVirgule(finDeVie),
    kilometresEnVoiture: Math.round(empreinteCarbone * kilometresEquivalent1TonneCO2).toLocaleString(),
    radiationIonisantes: deuxChiffresApresLaVirgule(radiationIonisantes),
    utilisation: deuxChiffresApresLaVirgule(utilisation),
  }
}

function transformerLesIndicateursImpactsEquipementsSommesModelEnViewModel(
  indicateursImpactsEquipementsSommesModel: Array<IndicateurImpactEquipementSommeModel>,
  referentielsEquipementsViewModel: Array<string>
): Array<IndicateurImpactEquipementSommeViewModel> {
  return indicateursImpactsEquipementsSommesModel
    .map((indicateurImpactEquipementSommeModel): IndicateurImpactEquipementSommeViewModel => {
      return {
        etapeAcv: indicateurImpactEquipementSommeModel.etapeAcv as `${EtapesAcv}`,
        impact: indicateurImpactEquipementSommeModel._sum.impactUnitaire,
        typeEquipement: indicateurImpactEquipementSommeModel.typeEquipement,
      }
    })
    .sort(sortByTypeEquipementAndEtapeAcv(referentielsEquipementsViewModel))
}

function tranformerLesReferentielsTypesEquipementsModelEnViewModel(referentielsTypesEquipementsModel: Array<ReferentielTypeEquipementModel>): Array<string> {
  return referentielsTypesEquipementsModel.map((referentielTypeEquipementModel): string => referentielTypeEquipementModel.type)
}

function deuxChiffresApresLaVirgule(chiffre: number): string {
  return Number(chiffre.toFixed(2)).toLocaleString()
}

function sortByTypeEquipementAndEtapeAcv(referentielsEquipementsViewModel: Array<string>) {
  return (a: IndicateurImpactEquipementSommeViewModel, b: IndicateurImpactEquipementSommeViewModel) => {
    let etapeAcvA = '0'
    let etapeAcvB = '0'

    const cyclesDeVie = [
      'FABRICATION',
      'DISTRIBUTION',
      'UTILISATION',
      'FIN_DE_VIE',
    ]

    for (let poids = 0; poids < referentielsEquipementsViewModel.length; poids++) {
      if (a.typeEquipement === referentielsEquipementsViewModel[poids]) {
        etapeAcvA = poids.toString()
      }

      if (b.typeEquipement === referentielsEquipementsViewModel[poids]) {
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

    if (etapeAcvA < etapeAcvB) {
      return -1
    }

    return 0
  }
}
