import { FormEvent, ReactElement, useState } from 'react'

import InfoBulle from '../commun/Infobulle'

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
        className={'form-control'}
        id="heureUtilisation"
        max={24}
        min={-24}
        name="heureUtilisation"
        onChange={modifierHeureUtilisation}
        type="number"
        value={heureUtilisation}
      />
    </>
  )
}
