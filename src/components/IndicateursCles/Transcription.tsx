import { ReactElement } from 'react'

import { IndicateursSommesViewModel, tolowerCase } from '../viewModel'

type IndicateurProps = Readonly<{
  indicateursSommesViewModel: IndicateursSommesViewModel[]
}>

export default function Transcription({ indicateursSommesViewModel }: IndicateurProps): ReactElement {
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
          indicateursSommesViewModel.map((indicateurSommeViewModel): ReactElement => (
            <tr key={indicateurSommeViewModel.typeEquipement + indicateurSommeViewModel.etapeAcv}>
              <td>
                {indicateurSommeViewModel.typeEquipement}
              </td>
              <td>
                {tolowerCase(indicateurSommeViewModel.etapeAcv)}
              </td>
              <td>
                {Number(indicateurSommeViewModel.impact.toFixed(2)).toLocaleString()}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
