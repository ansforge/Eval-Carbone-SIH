import { EquipementPhysique } from '../../repository/equipementsRepository'

export const modelesSelectionnes = () => {
  const selects = document.querySelectorAll<HTMLSelectElement>('form select')
  const inputs = document.querySelectorAll<HTMLInputElement>('form input')
  const modeles: EquipementPhysique[] = []

  for (let index = 0; index < selects.length; index++) {
    if (inputs[index].valueAsNumber > 0) {
      modeles.push({
        modele: selects[index].selectedOptions[0].value,
        quantite: inputs[index].valueAsNumber,
        type: selects[index].dataset.nomEquipement as string,
      })
    }
  }

  return modeles
}
