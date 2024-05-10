import React, { ReactElement } from 'react'

import Modale from '../sharedComponents/Modale'
import { useModale } from '../sharedComponents/useModale'

type ModaleModifierUnReferentielProps = Readonly<{
  isDisabled: boolean
  validerLeformulaire: () => void
}>

export default function SoumettreUnReferentiel({
  isDisabled,
  validerLeformulaire,
}: ModaleModifierUnReferentielProps): ReactElement {
  const { fermerLaModale, isOpen, ouvrirLaModale } = useModale()

  const validerLaModale = () => {
    validerLeformulaire()
    fermerLaModale()
  }

  return (
    <>
      <button
        className="btn btn--plain btn--primary"
        disabled={isDisabled}
        onClick={ouvrirLaModale}
        type="button"
      >
        Modifier
      </button>
      <Modale
        fermerLaModale={fermerLaModale}
        isOpen={isOpen}
        titre={'Modifier un référentiel'}
        validerLaModale={validerLaModale}
      >
        <p>
          Si vous modifiez le référentiel, il sera définitivement remplacé et deviendra inaccessible. Veillez à conserver une copie du référentiel d’origine.
        </p>
      </Modale>
    </>
  )
}
