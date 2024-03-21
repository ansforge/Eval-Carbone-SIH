'use client'

import { ReactElement } from 'react'

import Modele from './Modele'
import { ModeleReducer, useEquipement } from './useEquipement'
import { NomModeleViewModel } from '../viewModel'

type EquipementProps = Readonly<{
  equipementAvecSesModelesViewModel: { modeles: ModeleReducer[], type: string }
  idFieldset: string
  idAccordion: string
  nomsModelesViewModel: NomModeleViewModel[]
  setQuantiteGlobale: (quantite: number) => void
}>

export default function Equipement({
  equipementAvecSesModelesViewModel,
  idAccordion,
  idFieldset,
  nomsModelesViewModel,
  setQuantiteGlobale,
}: EquipementProps): ReactElement {
  const nomEquipement = equipementAvecSesModelesViewModel.type
  const { ajouterUnModele, isToggle, lignesModele, modifierUnModele, supprimerUnModele, toggle } =
    useEquipement(setQuantiteGlobale, equipementAvecSesModelesViewModel.modeles)

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
          lignesModele.map((ligneModele): ReactElement => (
            <Modele
              id={ligneModele.id}
              key={ligneModele.id}
              ligneModele={ligneModele}
              modifierUnModele={modifierUnModele}
              nomEquipement={nomEquipement}
              nomsModelesViewModel={nomsModelesViewModel}
              supprimerUnModele={supprimerUnModele(ligneModele.id)}
            />
          ))
        }
        <div>
          <button
            className="text-primary"
            onClick={ajouterUnModele}
            type="button"
          >
            <svg
              aria-hidden
              className="svg-icon"
              focusable="false"
            >
              <use xlinkHref="/svg-icons/icon-sprite.svg#circle-plus" />
            </svg>
            {' '}
            Ajouter un modèle
          </button>
        </div>
      </div>
    </fieldset>
  )
}
