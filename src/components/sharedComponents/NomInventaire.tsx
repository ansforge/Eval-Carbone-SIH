import { FormEvent, ReactElement } from 'react'

import InfoBulle from '../sharedComponents/Infobulle'

type NomInventaireProps = Readonly<{
  hasAsterisque: boolean
  isInvalid: boolean
  modifierNouveauNomInventaire: (event: FormEvent<HTMLInputElement>) => void
  nomEtablissement: string
  nouveauNomInventaire: string
}>

export default function NomInventaire({
  hasAsterisque,
  isInvalid,
  modifierNouveauNomInventaire,
  nomEtablissement,
  nouveauNomInventaire,
}: NomInventaireProps): ReactElement {
  return (
    <div className={`form-group text-left${isInvalid ? ' is-invalid' : ''}`}>
      <label htmlFor="nouveauNomInventaire">
        {`Nom de l’inventaire ${hasAsterisque ? '*' : ''} (minimum 4 caractères)`}
      </label>
      <InfoBulle label="Le nom de l’inventaire permet de différencier facilement les différents inventaires au sein d’une organisation et peut être composé de plusieurs éléments (nom de l’entité, référence temporelle)." />
      <input
        aria-describedby={isInvalid ? 'formInputError-error' : ''}
        aria-invalid={isInvalid}
        className={`form-control${isInvalid ? ' is-invalid' : ''}`}
        id="nouveauNomInventaire"
        name="nouveauNomInventaire"
        onChange={modifierNouveauNomInventaire}
        required={true}
        type="text"
        value={nouveauNomInventaire}
      />
      {
        isInvalid ? (
          <p
            className="description"
            id="formInputError-error"
          >
            Cet inventaire existe déjà. Modifiez le nom de l’inventaire pour continuer.
          </p>
        ) : null
      }
      <input
        name="nomEtablissement"
        type="hidden"
        value={nomEtablissement}
      />
    </div>
  )
}
