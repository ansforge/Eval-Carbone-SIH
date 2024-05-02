import { ReactElement } from 'react'

import { IndicateurImpactEquipementSomme, toLowerCase } from '../../presenters/indicateursClesPresenter'

type TranscriptionProps = Readonly<{
  indicateursImpactsEquipementsSommes: ReadonlyArray<IndicateurImpactEquipementSomme>
}>

export default function Transcription({ indicateursImpactsEquipementsSommes }: TranscriptionProps): ReactElement {
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
          indicateursImpactsEquipementsSommes.map((indicateurImpactEquipementSomme): ReactElement => (
            <tr key={indicateurImpactEquipementSomme.typeEquipement + indicateurImpactEquipementSomme.etapeAcv}>
              <td>
                {indicateurImpactEquipementSomme.typeEquipement}
              </td>
              <td>
                {toLowerCase(indicateurImpactEquipementSomme.etapeAcv)}
              </td>
              <td>
                {Number(indicateurImpactEquipementSomme.impact.toFixed(2)).toLocaleString()}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
