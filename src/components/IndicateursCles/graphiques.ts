import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement, ChartData, ChartOptions, ChartDataset } from 'chart.js'

import { EtapesAcv, IndicateurImpactEquipementSomme, toLowerCase } from '../../presenters/indicateursClesPresenter'

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

const colors = [
  'rgba(22, 91, 170, 1)',
  'rgba(161, 85, 185, 1)',
  'rgba(247, 101, 163, 1)',
  'rgba(255, 174, 209, 1)',
  'rgba(139, 86, 18, 1)',
  'rgba(242, 154, 43, 1)',
  'rgba(255, 233, 206, 1)',
  'rgba(24, 71, 55, 1)',
  'rgba(54, 142, 110, 1)',
  'rgba(163, 230, 206, 1)',
  'rgba(111, 0, 0, 1)',
  'rgba(225, 20, 20, 1)',
  'rgba(255, 166, 166, 1)',
  'rgba(180, 163, 0, 1)',
  'rgba(218, 200, 255, 1)',
  'rgba(255, 245, 140, 1)',
  'rgba(117, 31, 81, 1)',
]

export const optionsHistogramme: ChartOptions<'bar'> = {
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: 'kgCO2 eq',
      },
    },
  },
}

export const optionsCamembert: ChartOptions<'pie'> = {
  aspectRatio: 3,
  plugins: {
    legend: {
      position: 'right' as const,
    },
  },
  responsive: true,
}

const filtrerParEtapeAcv =
  (etapeAcv: EtapesAcv) =>
    (indicateurImpactEquipementSomme: IndicateurImpactEquipementSomme): boolean =>
      indicateurImpactEquipementSomme.etapeAcv === etapeAcv

const filtrerParTypeEquipement =
  (typeEquipement: string) =>
    (indicateurImpactEquipementSomme: IndicateurImpactEquipementSomme): boolean =>
      indicateurImpactEquipementSomme.typeEquipement === typeEquipement

const cumulerParImpact = (impactAccumule: Array<number>, indicateurImpactEquipementSomme: IndicateurImpactEquipementSomme): Array<number> => {
  impactAccumule.push(indicateurImpactEquipementSomme.impact)
  return impactAccumule
}

export function donneesParTypeEquipement(indicateursImpactsEquipementsSommes: ReadonlyArray<IndicateurImpactEquipementSomme>): ChartData<'bar'> {
  const nomTypesEquipement = indicateursImpactsEquipementsSommes.reduce(
    (quantiteAccumulee, indicateurImpactEquipementSomme): Set<string> => {
      return quantiteAccumulee.add(indicateurImpactEquipementSomme.typeEquipement)
    },
    new Set<string>()
  )

  const impactsParCycleDeVie = Object.values(EtapesAcv).map((etapeAcv, index): ChartDataset<'bar', Array<number | [number, number] | null>> => {
    return {
      backgroundColor: colors[index],
      data: indicateursImpactsEquipementsSommes
        .filter(filtrerParEtapeAcv(etapeAcv))
        .reduce(cumulerParImpact, Array<number>()),
      label: toLowerCase(etapeAcv),
    }
  })

  return {
    datasets: impactsParCycleDeVie,
    labels: Array.from(nomTypesEquipement),
  }
}

export function donneesParCycleDeVie(indicateursImpactsEquipementsSommes: ReadonlyArray<IndicateurImpactEquipementSomme>, referentielsTypesEquipements: ReadonlyArray<string>): ChartData<'bar'> {
  const etapesAcv = indicateursImpactsEquipementsSommes.reduce(
    (quantiteAccumulee, indicateurImpactEquipementSomme): Set<string> => {
      return quantiteAccumulee.add(toLowerCase(indicateurImpactEquipementSomme.etapeAcv))
    },
    new Set<string>()
  )

  const impactsParTypeEquipement = referentielsTypesEquipements
    .map((referentielTypeEquipement, index): ChartDataset<'bar', Array<number | [number, number] | null>> => {
      return {
        backgroundColor: colors[index],
        data: indicateursImpactsEquipementsSommes
          .filter(filtrerParTypeEquipement(referentielTypeEquipement))
          .reduce(cumulerParImpact, Array<number>()),
        label: referentielTypeEquipement,
      }
    })
    .filter((data): boolean => data.data.length !== 0)

  return {
    datasets: impactsParTypeEquipement,
    labels: Array.from(etapesAcv),
  }
}

export function donneesRepartitionParTypeEquipement(
  indicateursImpactsEquipementsSommes: ReadonlyArray<IndicateurImpactEquipementSomme>,
  referentielsTypesEquipements: ReadonlyArray<string>,
  etapeAcv: EtapesAcv
): ChartData<'pie'> {
  const nomTypesEquipement = indicateursImpactsEquipementsSommes.reduce(
    (quantiteAccumulee, indicateurImpactEquipementSomme): Set<string> => {
      return quantiteAccumulee.add(indicateurImpactEquipementSomme.typeEquipement)
    },
    new Set<string>()
  )

  const impactsParTypeEquipement = referentielsTypesEquipements
    .map((referentielTypeEquipement): ReadonlyArray<number> => {
      return indicateursImpactsEquipementsSommes
        .filter(filtrerParTypeEquipement(referentielTypeEquipement))
        .filter(filtrerParEtapeAcv(etapeAcv))
        .reduce(cumulerParImpact, Array<number>())
    })
    .filter((data): boolean => data.length !== 0)

  return {
    datasets: [
      {
        backgroundColor: colors,
        data: impactsParTypeEquipement.flat(),
        label: toLowerCase(etapeAcv),
      },
    ],
    labels: Array.from(nomTypesEquipement),
  }
}
