import { indicateurImpactEquipementModel } from '@prisma/client'
import { notFound } from 'next/navigation'

import { getProfilAtih } from '../../../authentification'
import { recupererTousLesIndicateursImpactsEquipementsRepository } from '../../../repositories/indicateursRepository'

export async function GET(): Promise<Response> {
  const profil = await getProfilAtih()

  if (!profil.isAdmin) {
    notFound()
  }

  const indicateurs = await recupererTousLesIndicateursImpactsEquipementsRepository()

  const fichierCsv = creerLeFichierAExporter(indicateurs)

  return new Response(
    fichierCsv,
    {
      headers: {
        'content-disposition': `attachment; filename="${fichierCsv.name}"`,
      },
    }
  )
}

function creerLeFichierAExporter(indicateurs: ReadonlyArray<indicateurImpactEquipementModel>): File {
  const data = ['date_calcul;date_lot;nom_lot;etapeacv;critere;source;statut_indicateur;trace;version_calcul;conso_elec_moyenne;impact_unitaire;quantite;statut_equipement_physique;type_equipement;unite;nom_entite;nom_organisation;nom_source_donnee;nom_equipement;date_lot_discriminator;nom_organisation_discriminator;nom_entite_discriminator;nom_source_donnee_discriminator']

  for (const indicateur of indicateurs) {
    data.push(`${indicateur.date_calcul?.toLocaleString('fr-FR')};${indicateur.dateInventaire.toLocaleString('fr-FR')};${indicateur.nomInventaire};${indicateur.etapeAcv};${indicateur.critere};${indicateur.source};${indicateur.statutIndicateur};${indicateur.trace};${indicateur.version_calcul};${indicateur.conso_elec_moyenne};${indicateur.impactUnitaire};${indicateur.quantite};${indicateur.statut_equipement_physique};${indicateur.typeEquipement};${indicateur.unite};${indicateur.nom_entite};${indicateur.nomEtablissement};${indicateur.nom_source_donnee};${indicateur.nom_equipement};${indicateur.date_lot_discriminator?.toLocaleString('fr-FR')};${indicateur.nom_organisation_discriminator};${indicateur.nom_entite_discriminator};${indicateur.nom_source_donnee_discriminator}`)
  }

  return new File([data.join('\n')], `EvalCarboneSIH_Inventaires_${new Date().toLocaleDateString('fr-FR')}.csv`, { type: 'text/csv' })
}
