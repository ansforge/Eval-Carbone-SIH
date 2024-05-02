import { modeleModel } from '@prisma/client'

import { StatutsInventaire, calculerLaDureeDeVie, convertirLeTauxUtilisationEnHeureUtilisation, formaterLaDateEnFrancais, genererUnIdentifiantUnique } from './sharedPresenter'
import { ModeleReducer } from '../components/Inventaire/useEquipement'
import { ReferentielTypeEquipementModel } from '../gateways/typesEquipementsRepository'

export type EquipementAvecSesModelesPresenter = Readonly<{
  modeles: Array<ModeleReducer>
  type: string
}>

export type InventairePresenter = Readonly<{
  dateInventaire: string
  equipementsAvecSesModeles: ReadonlyArray<EquipementAvecSesModelesPresenter>
  isNonCalcule: boolean
}>

export function inventairePresenter(
  referentielsTypesEquipementsModel: ReadonlyArray<ReferentielTypeEquipementModel>,
  modelesModel: ReadonlyArray<modeleModel>,
  statut: StatutsInventaire
): InventairePresenter {
  const equipementsAvecSesModeles = referentielsTypesEquipementsModel.map((referentielTypeEquipementModel): EquipementAvecSesModelesPresenter => {
    return {
      modeles: referentielTypeEquipementModel.modeles
        .map((modele): ModeleReducer => {
          let quantite = 0
          let dureeDeVie = referentielTypeEquipementModel.dureeDeVie
          let heureUtilisation = 24
          const equipementsModelFiltre = modelesModel.filter((modeleModel): boolean => modeleModel.nom === modele.relationModeles.nom)

          if (equipementsModelFiltre.length > 0) {
            quantite = equipementsModelFiltre[0].quantite
            dureeDeVie = calculerLaDureeDeVie(equipementsModelFiltre[0].dateAchat)
            heureUtilisation = convertirLeTauxUtilisationEnHeureUtilisation(equipementsModelFiltre[0].tauxUtilisation)
          }

          return {
            dureeDeVie,
            heureUtilisation,
            id: genererUnIdentifiantUnique(),
            nomModele: modele.relationModeles.nom,
            quantite,
          }
        }),
      type: referentielTypeEquipementModel.type,
    }
  })

  const dateInventaire = modelesModel.length === 0 ? new Date() : modelesModel[0].dateInventaire

  return {
    dateInventaire: formaterLaDateEnFrancais(dateInventaire),
    equipementsAvecSesModeles,
    isNonCalcule: statut === StatutsInventaire.TRAITE,
  }
}
