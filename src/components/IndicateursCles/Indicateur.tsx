import { ReactElement } from 'react'

import InfoBulle from '../sharedComponents/Infobulle'

type IndicateurProps = Readonly<{
  coin: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  texteInfoBulle: string
  titre: string
  valeur: string
  unite: ReactElement | string
}>

export default function Indicateur({ coin, texteInfoBulle, titre, valeur, unite }: IndicateurProps): ReactElement {
  return (
    <section className={`col-md border rounded-sm ${coin}-radius-0 p-4 m-2 text-center bg-white`}>
      <h2 className="h4">
        {titre}
        <InfoBulle label={texteInfoBulle} />
      </h2>
      <div className="h1 fw-bold">
        {valeur}
      </div>
      <div>
        {unite}
      </div>
    </section>
  )
}
