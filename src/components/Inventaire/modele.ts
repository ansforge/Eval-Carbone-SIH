import { Modele } from '../../repository/modelesRepository'

export const modelesSelectionnes = (): Array<Modele> => {
  const equipements = document.querySelectorAll<HTMLDivElement>('form [data-nom-equipement]')
  const quantites = document.querySelectorAll<HTMLInputElement>('form [data-quantite]')
  const dureesDeVie = document.querySelectorAll<HTMLInputElement>('form [data-duree-de-vie]')
  const heuresUtilisation = document.querySelectorAll<HTMLInputElement>('form [data-heure-utilisation]')
  const modeles: Array<Modele> = []

  for (let index = 0; index < equipements.length; index++) {
    if (quantites[index].valueAsNumber > 0) {
      modeles.push({
        dureeDeVie: dureesDeVie[index].valueAsNumber,
        heureUtilisation: heuresUtilisation[index].valueAsNumber,
        modele: equipements[index].innerText,
        quantite: quantites[index].valueAsNumber,
        type: equipements[index].dataset.nomEquipement ?? '',
      })
    }
  }

  return modeles
}
