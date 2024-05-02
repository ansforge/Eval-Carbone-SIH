import { modeleModel } from '@prisma/client'

import { StatutsInventaire } from './sharedPresenter'
import { ModeleReducer } from '../components/Inventaire/useEquipement'
import { ReferentielTypeEquipementModel } from '../repository/typesEquipementsRepository'

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
  referentielsTypesEquipementsModel: Array<ReferentielTypeEquipementModel>,
  modelesModel: Array<modeleModel>,
  statut: StatutsInventaire
): InventairePresenter {
  const equipementsAvecSesModeles = referentielsTypesEquipementsModel.map((referentielTypeEquipementModel): EquipementAvecSesModelesPresenter => {
    return {
      modeles: referentielTypeEquipementModel.modeles
        .map((modele): ModeleReducer => {
          let quantite = 0
          let dureeDeVie = referentielTypeEquipementModel.dureeDeVie
          let heureUtilisation = 24
          const equipementsModelFiltre = modelesModel
            .filter((modeleModel): boolean => modeleModel.nom === modele.relationModeles.nom)

          if (equipementsModelFiltre.length > 0) {
            quantite = equipementsModelFiltre[0].quantite
            dureeDeVie = new Date().getFullYear() - equipementsModelFiltre[0].dateAchat.getFullYear()
            heureUtilisation = Math.round(equipementsModelFiltre[0].tauxUtilisation * 24)
          }

          return {
            dureeDeVie,
            heureUtilisation,
            id: crypto.randomUUID(),
            nomModele: modele.relationModeles.nom,
            quantite,
          }
        }),
      type: referentielTypeEquipementModel.type,
    }
  })

  const dateInventaire = modelesModel.length === 0 ? new Date() : modelesModel[0].dateInventaire

  return {
    dateInventaire: dateInventaire.toLocaleDateString('fr-FR'),
    equipementsAvecSesModeles,
    isNonCalcule: statut === StatutsInventaire.TRAITE,
  }
}
