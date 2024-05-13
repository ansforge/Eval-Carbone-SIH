import { FormEvent, ReactElement, useState } from 'react'

import InfoBulle from '../sharedComponents/Infobulle'

export default function NombreEquipement(): ReactElement {
  const [nombreEquipement, setNombreEquipement] = useState('0')

  const modifierNombreEquipement = (event: FormEvent<HTMLInputElement>) => {
    setNombreEquipement(event.currentTarget.value)
  }

  return (
    <>
      <label htmlFor="nombreEquipement">
        Nombre d’équipements en %
      </label>
      <InfoBulle label="Par exemple, en inscrivant le chiffre 10, chaque équipement verra son nombre augmenter de 10 %." />
      <input
        className="form-control"
        id="nombreEquipement"
        max={100}
        min={-100}
        name="nombreEquipement"
        onChange={modifierNombreEquipement}
        type="number"
        value={nombreEquipement}
      />
    </>
  )
}
