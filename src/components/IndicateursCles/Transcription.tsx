import { ReactElement } from 'react'

import { IndicateurImpactEquipementSommeViewModel, toLowerCase } from '../viewModel'

type TranscriptionProps = Readonly<{
  indicateursImpactsEquipementsSommesViewModel: ReadonlyArray<IndicateurImpactEquipementSommeViewModel>
}>

export default function Transcription({ indicateursImpactsEquipementsSommesViewModel }: TranscriptionProps): ReactElement {
  return (
    <table className="table table-bordered">
      <caption className="nav-skip">
        Transcription des données de l’empreinte carbone par type d’équipement
      </caption>
      <thead>
        <tr>
          <th scope="col">
            Type
          </th>
          <th scope="col">
            Phase de cycle de vie
          </th>
          <th scope="col">
            KgCO2 équivalent
          </th>
        </tr>
      </thead>
      <tbody>
        {
          indicateursImpactsEquipementsSommesViewModel.map((indicateurImpactEquipementSommeViewModel): ReactElement => (
            <tr key={indicateurImpactEquipementSommeViewModel.typeEquipement + indicateurImpactEquipementSommeViewModel.etapeAcv}>
              <td>
                {indicateurImpactEquipementSommeViewModel.typeEquipement}
              </td>
              <td>
                {toLowerCase(indicateurImpactEquipementSommeViewModel.etapeAcv)}
              </td>
              <td>
                {Number(indicateurImpactEquipementSommeViewModel.impact.toFixed(2)).toLocaleString()}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
