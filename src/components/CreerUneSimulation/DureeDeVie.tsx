import { FormEvent, ReactElement, useState } from 'react'

import InfoBulle from '../sharedComponents/Infobulle'

export default function DureeDeVie(): ReactElement {
  const [dureeDeVie, setDureeDeVie] = useState('0')

  const modifierDureeDeVie = (event: FormEvent<HTMLInputElement>) => {
    setDureeDeVie(event.currentTarget.value)
  }

  return (
    <>
      <label htmlFor="dureeDeVie">
        Durée de vie en années
      </label>
      <InfoBulle label="Par exemple, en inscrivant le chiffre 2, la durée de vie souhaitée de chaque équipement augmentera de 2 ans." />
      <input
        aria-describedby="dureeDeVieDescription"
        className="form-control"
        id="dureeDeVie"
        max={20}
        min={-20}
        name="dureeDeVie"
        onChange={modifierDureeDeVie}
        type="number"
        value={dureeDeVie}
      />
      <p
        className="description mb-2"
        id="dureeDeVieDescription"
      >
        Valeur limitée de -20 ans à 20 ans
      </p>
    </>
  )
}
