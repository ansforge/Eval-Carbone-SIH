import { Modele } from '../../repositories/modelesRepository'

export const modelesSelectionnes = (): ReadonlyArray<Modele> => {
  const nomsModeles = document.querySelectorAll<HTMLInputElement>('form [data-nom-equipement]')
  const quantites = document.querySelectorAll<HTMLInputElement>('form [data-quantite]')
  const dureesDeVie = document.querySelectorAll<HTMLInputElement>('form [data-duree-de-vie]')
  const heuresUtilisation = document.querySelectorAll<HTMLInputElement>('form [data-heure-utilisation]')
  const modeles: Array<Modele> = []

  for (let index = 0; index < nomsModeles.length; index++) {
    if (quantites[index].valueAsNumber > 0) {
      modeles.push({
        dureeDeVie: dureesDeVie[index].valueAsNumber,
        heureUtilisation: heuresUtilisation[index].valueAsNumber,
        modele: nomsModeles[index].value,
        quantite: quantites[index].valueAsNumber,
        type: nomsModeles[index].dataset.nomEquipement ?? '',
      })
    }
  }

  return modeles
}
