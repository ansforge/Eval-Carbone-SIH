'use client'

import { ReactElement } from 'react'

import Modele from './Modele'
import { ModeleReducer, useEquipement } from './useEquipement'

type EquipementProps = Readonly<{
  equipementAvecSesModelesViewModel: { modeles: ModeleReducer[], type: string }
  idFieldset: string
  idAccordion: string
  setQuantiteGlobale: (quantite: number) => void
}>

export default function Equipement({
  equipementAvecSesModelesViewModel,
  idAccordion,
  idFieldset,
  setQuantiteGlobale,
}: EquipementProps): ReactElement {
  const nomEquipement = equipementAvecSesModelesViewModel.type
  const { isToggle, lignesModele, modifierUnModele, toggle } = useEquipement(setQuantiteGlobale, equipementAvecSesModelesViewModel.modeles)

  return (
    <fieldset
      className="js-accordion o-accordion"
      data-accordion-multiselectable="none"
      data-accordion-prefix-classes="o"
      data-hashaccordion-id={idAccordion}
      id={idFieldset}
    >
      <legend className="o-accordion__title">
        <button
          aria-controls={`accordion${idFieldset}_panel1`}
          aria-expanded={isToggle}
          className="js-accordion__header o-accordion__header"
          data-hashaccordion-id={idAccordion}
          id={`accordion${idFieldset}_tab1`}
          onClick={toggle}
          type="button"
        >
          {nomEquipement}
          {' '}
          (
          {lignesModele.reduce((quantiteAccumulee, modele): number => {
            if (!isNaN(modele.quantite)) {
              return quantiteAccumulee + modele.quantite
            }
            return quantiteAccumulee
          }, 0)}
          )
          <svg
            aria-hidden
            className="svg-icon svg-angle-down"
            focusable="false"
          >
            <use xlinkHref="/svg-icons/icon-sprite.svg#angle-down" />
          </svg>
        </button>
      </legend>
      <div
        aria-hidden={!isToggle}
        aria-labelledby={`accordion${idFieldset}_tab1`}
        className="js-accordion__panel o-accordion__panel pt-3"
        data-hashaccordion-id={idAccordion}
        id={`accordion${idFieldset}_panel1`}
        role="tabpanel"
      >
        {
          lignesModele.map((ligneModele, index): ReactElement => (
            <div key={ligneModele.id}>
              <Modele
                id={ligneModele.id}
                ligneModele={ligneModele}
                modifierUnModele={modifierUnModele}
                nomEquipement={nomEquipement}
                nomModele={ligneModele.nomModele}
              />
              {
                lignesModele.length !== index + 1 && <hr />
              }
            </div>
          ))
        }
      </div>
    </fieldset>
  )
}
