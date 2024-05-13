import { FormEvent, ReactElement, useState } from 'react'

import InfoBulle from '../sharedComponents/Infobulle'

export default function HeureUtilisation(): ReactElement {
  const [heureUtilisation, setHeureUtilisation] = useState('0')

  const modifierHeureUtilisation = (event: FormEvent<HTMLInputElement>) => {
    setHeureUtilisation(event.currentTarget.value)
  }

  return (
    <>
      <label htmlFor="heureUtilisation">
        Heures d’utilisation par jour
      </label>
      <InfoBulle label="Par exemple, en inscrivant le chiffre -5, le nombre d'heures d'utilisation par équipement sera réduit de 5 heures." />
      <input
        aria-describedby="heureUtilisationDescription"
        className="form-control"
        id="heureUtilisation"
        max={24}
        min={-23}
        name="heureUtilisation"
        onChange={modifierHeureUtilisation}
        type="number"
        value={heureUtilisation}
      />
      <p
        className="description"
        id="heureUtilisationDescription"
      >
        Valeur limitée de -23 heures à 24 heures
      </p>
    </>
  )
}
