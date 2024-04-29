import { ind_indicateur_impact_equipement_physique } from '@prisma/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import IndicateursCles from '../../../components/IndicateursCles/IndicateursCles'
import { Criteres, EtapesAcv, IndicateursSommesViewModel, IndicateursViewModel } from '../../../components/viewModel'
import { EquipementPhysiqueModel, recupererLesReferentielsEquipementsRepository } from '../../../repository/equipementsRepository'
import { IndicateursSommesModel, recupererIndicateursEquipementsPhysiquesRepository, recupererIndicateursEquipementsPhysiquesSommesRepository } from '../../../repository/indicateursRepository'

const title = 'Indicateurs clés'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams: Readonly<{
    nomInventaire?: string
  }>
}>

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  if (searchParams.nomInventaire === undefined) {
    notFound()
  }

  const profile = await getProfileAtih()

  const indicateursModel = await recupererIndicateursEquipementsPhysiquesRepository(profile.nomEtablissement, searchParams.nomInventaire)

  if (indicateursModel.length === 0) {
    notFound()
  }

  const indicateursSommesModel = await recupererIndicateursEquipementsPhysiquesSommesRepository(profile.nomEtablissement, searchParams.nomInventaire)

  const referentielsEquipementsModel = await recupererLesReferentielsEquipementsRepository()

  const referentielsEquipementsViewModel = tranformReferentielsEquipementsToViewModel(referentielsEquipementsModel)

  const indicateursSommesViewModel = transformIndicateursSommesModelToViewModel(indicateursSommesModel, referentielsEquipementsViewModel)

  const indicateursViewModel = transformIndicateursModelToViewModel(indicateursModel)

  const dateInventaire = indicateursModel[0].date_lot.toLocaleDateString('fr-FR')

  return (
    <>
      <Breadcrumb label={title} />
      <IndicateursCles
        dateInventaire={dateInventaire}
        indicateursSommesViewModel={indicateursSommesViewModel}
        indicateursViewModel={indicateursViewModel}
        nomEtablissement={profile.nomEtablissement}
        nomInventaire={searchParams.nomInventaire}
        referentielsEquipementsViewModel={referentielsEquipementsViewModel}
      />
    </>
  )
}

function transformIndicateursModelToViewModel(indicateursModel: ind_indicateur_impact_equipement_physique[]): IndicateursViewModel {
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

  for (const indicateur of indicateursModel) {
    const critere = indicateur.critere as Criteres
    const etapeacv = indicateur.etapeacv as EtapesAcv

    if (critere === Criteres.radiationIonisantes) {
      radiationIonisantes += indicateur.impact_unitaire
    } else if (critere === Criteres.epuisementDesRessources) {
      epuisementDesRessources += indicateur.impact_unitaire
    } else if (critere === Criteres.emissionsDeParticulesFines) {
      emissionsDeParticulesFines += indicateur.impact_unitaire
    } else if (critere === Criteres.acidification) {
      acidification += indicateur.impact_unitaire
    } else {
      empreinteCarbone += indicateur.impact_unitaire / 1000

      if (etapeacv === EtapesAcv.fabrication) {
        fabrication += indicateur.impact_unitaire / 1000
      } else if (etapeacv === EtapesAcv.distribution) {
        distribution += indicateur.impact_unitaire / 1000
      } else if (etapeacv === EtapesAcv.utilisation) {
        utilisation += indicateur.impact_unitaire / 1000
      } else {
        finDeVie += indicateur.impact_unitaire / 1000
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

function transformIndicateursSommesModelToViewModel(
  indicateursSommesModel: IndicateursSommesModel[],
  referentielsEquipementsViewModel: string[]
): IndicateursSommesViewModel[] {
  return indicateursSommesModel
    .map((indicateurSomme): IndicateursSommesViewModel => {
      return {
        etapeAcv: indicateurSomme.etapeacv as `${EtapesAcv}`,
        impact: indicateurSomme._sum.impact_unitaire,
        typeEquipement: indicateurSomme.type_equipement,
      }
    })
    .sort(sortByTypeEquipementAndEtapeAcv(referentielsEquipementsViewModel))
}

function tranformReferentielsEquipementsToViewModel(referentielsEquipementsModel: EquipementPhysiqueModel[]): string[] {
  return referentielsEquipementsModel.map((referentielEquipementModel): string => referentielEquipementModel.type)
}

function deuxChiffresApresLaVirgule(chiffre: number): string {
  return Number(chiffre.toFixed(2)).toLocaleString()
}

function sortByTypeEquipementAndEtapeAcv(referentielsEquipementsViewModel: string[]) {
  return (a: IndicateursSommesViewModel, b: IndicateursSommesViewModel) => {
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
