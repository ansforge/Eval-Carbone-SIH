import { EquipementPhysique } from '../../repository/equipementsRepository'

export const modelesSelectionnes = () => {
  const selects = document.querySelectorAll<HTMLSelectElement>('form [data-nom-equipement]')
  const inputs = document.querySelectorAll<HTMLInputElement>('form [data-nom-quantite]')
  const modeles: EquipementPhysique[] = []

  for (let index = 0; index < selects.length; index++) {
    if (inputs[index].valueAsNumber > 0) {
      modeles.push({
        modele: selects[index].value,
        quantite: inputs[index].valueAsNumber,
        type: selects[index].dataset.nomEquipement ?? '',
      })
    }
  }

  return modeles
}
