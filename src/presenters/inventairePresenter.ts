import { modeleModel } from '@prisma/client'

import { StatutsInventaire, calculerLaDureeDeVie, convertirLeTauxUtilisationEnHeureUtilisation, formaterLaDateEnFrancais, genererUnIdentifiantUnique } from './sharedPresenter'
import { SearchParams } from '../app/(connecte)/inventaire/page'
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
  searchParams: SearchParams
): InventairePresenter {
  const dateInventaire = modelesModel.length === 0 || searchParams.nouveauNomInventaire !== undefined ? new Date() : modelesModel[0].dateInventaire

  const isNonCalcule = (searchParams.statut ?? StatutsInventaire.EN_ATTENTE) === StatutsInventaire.TRAITE

  const equipementsAvecSesModeles = referentielsTypesEquipementsModel.map((referentielTypeEquipementModel): EquipementAvecSesModelesPresenter => {
    return {
      modeles: referentielTypeEquipementModel.modeles
        .map((modele): ModeleReducer => {
          let quantite = 0
          let dureeDeVie = referentielTypeEquipementModel.dureeDeVie
          let heureUtilisation = 24
          const equipementsModelFiltre = modelesModel.filter((modeleModel): boolean => modeleModel.nom === modele.relationModeles.nom)

          if (equipementsModelFiltre.length > 0) {
            quantite = modifierQuantite(equipementsModelFiltre[0].quantite, searchParams.nombreEquipement)
            dureeDeVie = modifierDureeDeVie(calculerLaDureeDeVie(equipementsModelFiltre[0].dateAchat), searchParams.dureeDeVie)
            heureUtilisation = modifierHeureUtilisation(
              convertirLeTauxUtilisationEnHeureUtilisation(equipementsModelFiltre[0].tauxUtilisation),
              searchParams.heureUtilisation
            )
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

  return {
    dateInventaire: formaterLaDateEnFrancais(dateInventaire),
    equipementsAvecSesModeles,
    isNonCalcule,
  }
}

function modifierQuantite(quantite: number, pourcentage?: string): number {
  return pourcentage !== undefined ? Math.round(quantite + quantite * Number(pourcentage) / 100) : quantite
}

function modifierDureeDeVie(dureeDeVie: number, ajout?: string): number {
  const dureeDeVieMinimum = 1

  if (ajout !== undefined) {
    const resultat = dureeDeVie + Number(ajout)

    if (resultat < dureeDeVieMinimum) return dureeDeVieMinimum

    return resultat
  }

  return dureeDeVie
}

function modifierHeureUtilisation(heureUtilisation: number, ajout?: string): number {
  const heureUtilisationMinimum = 1
  const heureUtilisationMaximum = 24

  if (ajout !== undefined) {
    const resultat = heureUtilisation + Number(ajout)

    if (resultat < heureUtilisationMinimum) return heureUtilisationMinimum

    if (resultat > heureUtilisationMaximum) return heureUtilisationMaximum

    return resultat
  }

  return heureUtilisation
}
