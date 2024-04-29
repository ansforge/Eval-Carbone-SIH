import { en_equipement_physique } from '@prisma/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getProfileAtih } from '../../../authentification'
import Breadcrumb from '../../../components/commun/Breadcrumb'
import Inventaire from '../../../components/Inventaire/Inventaire'
import { ModeleReducer } from '../../../components/Inventaire/useEquipement'
import { EquipementsAvecSesModelesViewModel, StatutsInventaire } from '../../../components/viewModel'
import { EquipementPhysiqueModel, recupererLesEquipementsEnregistresRepository, recupererLesReferentielsEquipementsRepository } from '../../../repository/equipementsRepository'

const title = 'Renseigner les équipements'
export const metadata: Metadata = {
  title,
}

type PageProps = Readonly<{
  searchParams: Readonly<{
    nomInventaire?: string
    statut?: string
  }>
}>

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  if (searchParams.nomInventaire === undefined) {
    notFound()
  }

  const profile = await getProfileAtih()

  const equipementsReferentielsModel = await recupererLesReferentielsEquipementsRepository()

  const equipementsEnregistresModel = await recupererLesEquipementsEnregistresRepository(profile.nomEtablissement, searchParams.nomInventaire)

  const equipementsAvecSesModelesViewModel = transformTypesEquipementModelToViewModel(equipementsReferentielsModel, equipementsEnregistresModel)

  const statut = searchParams.statut === undefined ? StatutsInventaire.EN_ATTENTE : searchParams.statut as StatutsInventaire
  const dateInventaire = equipementsEnregistresModel.length === 0 ? new Date() : equipementsEnregistresModel[0].date_lot

  return (
    <>
      <Breadcrumb label={title} />
      <Inventaire
        dateInventaire={dateInventaire.toLocaleDateString('fr-FR')}
        equipementsAvecSesModelesViewModel={equipementsAvecSesModelesViewModel}
        nomEtablissement={profile.nomEtablissement}
        nomInventaire={searchParams.nomInventaire}
        statut={statut}
      />
    </>
  )
}

function transformTypesEquipementModelToViewModel(
  equipementsReferentielsModel: EquipementPhysiqueModel[],
  equipementsEnregistresModel: en_equipement_physique[]
): EquipementsAvecSesModelesViewModel[] {
  return equipementsReferentielsModel.map((equipementReferentielModel): EquipementsAvecSesModelesViewModel => {
    return {
      modeles: equipementReferentielModel.modeles
        .map((modele): ModeleReducer => {
          let quantite = 0
          let dureeDeVie = equipementReferentielModel.duree_vie_defaut
          let heureUtilisation = 24
          const equipementsModelFiltre = equipementsEnregistresModel
            .filter((equipementEnregistreModel): boolean => equipementEnregistreModel.modele === modele.ref_correspondance_ref_eqp.modele_equipement_source)

          if (equipementsModelFiltre.length > 0) {
            quantite = equipementsModelFiltre[0].quantite
            dureeDeVie = new Date().getFullYear() - equipementsModelFiltre[0].date_achat.getFullYear()
            heureUtilisation = Math.round(equipementsModelFiltre[0].taux_utilisation * 24)
          }

          return {
            dureeDeVie,
            heureUtilisation,
            id: crypto.randomUUID(),
            nomModele: modele.ref_correspondance_ref_eqp.modele_equipement_source,
            quantite,
          }
        }),
      type: equipementReferentielModel.type,
    }
  })
}
