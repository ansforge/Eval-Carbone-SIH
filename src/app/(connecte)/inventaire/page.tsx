import { modeleModel } from '@prisma/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import Inventaire from '../../../components/Inventaire/Inventaire'
import { ModeleReducer } from '../../../components/Inventaire/useEquipement'
import { EquipementAvecSesModelesViewModel, StatutsInventaire } from '../../../components/viewModel'
import { recupererLesModelesRepository } from '../../../repository/modelesRepository'
import { recupererLesReferentielsTypesEquipementsRepository, ReferentielTypeEquipementModel } from '../../../repository/typesEquipementsRepository'

const title = 'Renseigner les équipements'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams: Readonly<{
    nomEtablissement?: string
    nomInventaire?: string
    statut?: string
  }>
}>

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  if (searchParams.nomEtablissement === undefined || searchParams.nomInventaire === undefined) {
    notFound()
  }

  const profile = await getProfileAtih()

  if (!profile.isAdmin && profile.nomEtablissement !== searchParams.nomEtablissement) {
    notFound()
  }

  const modelesModel = await recupererLesModelesRepository(searchParams.nomEtablissement, searchParams.nomInventaire)

  const referentielsTypesEquipementsModel = await recupererLesReferentielsTypesEquipementsRepository()

  const equipementsAvecSesModelesViewModel = transformerLesReferentielsTypesEquipementsModelEnViewModel(referentielsTypesEquipementsModel, modelesModel)

  const statut = searchParams.statut === undefined ? StatutsInventaire.EN_ATTENTE : searchParams.statut as StatutsInventaire
  const dateInventaire = modelesModel.length === 0 ? new Date() : modelesModel[0].dateInventaire

  return (
    <>
      <Breadcrumb label={title} />
      <Inventaire
        dateInventaire={dateInventaire.toLocaleDateString('fr-FR')}
        equipementsAvecSesModelesViewModel={equipementsAvecSesModelesViewModel}
        isNonCalcule={statut === StatutsInventaire.TRAITE}
        nomEtablissement={searchParams.nomEtablissement}
        nomInventaire={searchParams.nomInventaire}
      />
    </>
  )
}

function transformerLesReferentielsTypesEquipementsModelEnViewModel(
  referentielsTypesEquipementsModel: Array<ReferentielTypeEquipementModel>,
  modelesModel: Array<modeleModel>
): Array<EquipementAvecSesModelesViewModel> {
  return referentielsTypesEquipementsModel.map((referentielTypeEquipementModel): EquipementAvecSesModelesViewModel => {
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
}
