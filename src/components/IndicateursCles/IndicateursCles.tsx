'use client'

import { ReactElement } from 'react'
import { Bar, Pie } from 'react-chartjs-2'

import Astuce from './Astuce'
import { donneesParCycleDeVie, donneesParTypeEquipement, donneesRepartitionParTypeEquipement, optionsCamembert, optionsHistogramme } from './graphiques'
import Indicateur from './Indicateur'
import Transcription from './Transcription'
import { EtapesAcv, IndicateursClesPresenter } from '../../presenters/indicateursClesPresenter'
import Accordeon from '../commun/Accordeon'
import Actions from '../commun/Actions'
import InfoBulle from '../commun/Infobulle'
import Onglets from '../commun/Onglets'

type IndicateursClesProps = Readonly<{
  nomEtablissement: string
  nomInventaire: string
  presenter: IndicateursClesPresenter
}>

export default function IndicateursCles({
  nomEtablissement,
  nomInventaire,
  presenter,
}: IndicateursClesProps): ReactElement {
  return (
    <>
      <Actions
        dateInventaire={presenter.dateInventaire}
        nomEtablissement={nomEtablissement}
        nomInventaire={nomInventaire}
      />
      <Onglets
        isSelected
        nomEtablissement={nomEtablissement}
        nomInventaire={nomInventaire}
      />
      <div className="border rounded-sm top-left-radius-0 p-5 bg-white">
        <div className="row mb-4">
          <section className="col-md-4 mr-1">
            <h2 className="h3">
              Empreinte carbone par an
              <InfoBulle label="L’empreinte carbone mesure la quantité totale de gaz à effet de serre émise, directement ou indirectement, par une activité, un produit ou un service, exprimée en équivalent de dioxyde de carbone (CO2)." />
            </h2>
            <div className="h1 fw-bold">
              {presenter.indicateursImpactsEquipements.empreinteCarbone}
            </div>
            <div>
              <abbr title="tonnes équivalent en dioxyde de carbone">
                tCO2 eq
              </abbr>
            </div>
            <hr />
            <div className="h5">
              Soit autant d’émissions que :
            </div>
            <div>
              🚗
              {' '}
              <span className="fw-semiBold">
                {presenter.indicateursImpactsEquipements.kilometresEnVoiture}
              </span>
              {' '}
              kilomètres en voiture
            </div>
          </section>
          <section className="col-md-7 border rounded-sm top-left-radius-0 p-2 ml-6">
            <h2 className="h5 mb-4">
              Détail de l’empreinte carbone de l’inventaire
            </h2>
            <div className="d-flex justify-content-between">
              <div className="col-md-4">
                Fabrication
              </div>
              <div className="col-md-8 fw-semiBold text-right">
                {presenter.indicateursImpactsEquipements.fabrication}
                {' '}
                <abbr title="tonnes équivalent en dioxyde de carbone">
                  tCO2 eq
                </abbr>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="col-md-4">
                Distribution
              </div>
              <div className="col-md-8 fw-semiBold text-right">
                {presenter.indicateursImpactsEquipements.distribution}
                {' '}
                <abbr title="tonnes équivalent en dioxyde de carbone">
                  tCO2 eq
                </abbr>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="col-md-4">
                Utilisation
              </div>
              <div className="col-md-8 fw-semiBold text-right">
                {presenter.indicateursImpactsEquipements.utilisation}
                {' '}
                <abbr title="tonnes équivalent en dioxyde de carbone">
                  tCO2 eq
                </abbr>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <div className="col-md-4">
                Fin de vie
              </div>
              <div className="col-md-8 fw-semiBold text-right">
                {presenter.indicateursImpactsEquipements.finDeVie}
                {' '}
                <abbr title="tonnes équivalent en dioxyde de carbone">
                  tCO2 eq
                </abbr>
              </div>
            </div>
          </section>
        </div>
        <div className="border rounded-sm top-left-radius-0 p-4 mb-4">
          <p className="fw-bold">
            EMPREINTE CARBONE PAR TYPE D’ÉQUIPEMENT
          </p>
          <p>
            L’empreinte est détaillée en kgCO2 équivalent par phase du cycle de vie.
          </p>
          <hr />
          <Bar
            data={donneesParTypeEquipement(presenter.indicateursImpactsEquipementsSommes)}
            options={optionsHistogramme}
          />
          <Astuce>
            Pour les équipements les plus impactants, pensez à réduire leur quantité et à privilégier l’utilisation d’appareils plus éco-responsables.
            Vous pouvez également choisir des appareils à double usage personnel et professionnel, ou encore réduire leur temps d’utilisation afin
            de diminuer leur impact sur l’environnement.
          </Astuce>
        </div>
        <div className="border rounded-sm top-left-radius-0 p-4 mb-4">
          <p className="fw-bold">
            EMPREINTE CARBONE PAR PHASE DE CYCLE DE VIE
          </p>
          <p>
            L’empreinte est détaillée en kgCO2 équivalent par type d’équipement.
          </p>
          <hr />
          <Bar
            data={donneesParCycleDeVie(presenter.indicateursImpactsEquipementsSommes, presenter.referentielsTypesEquipements)}
            options={optionsHistogramme}
          />
          <Astuce>
            Pour optimiser l’empreinte de votre inventaire, encouragez la prolongation de la durée de vie de vos équipements,
            privilégiez la réparation et promouvez l’extinction des équipements hors utilisation.
          </Astuce>
        </div>
        <div className="border rounded-sm top-left-radius-0 p-4 mb-4">
          <p className="fw-bold">
            RÉPARTITION DE l’EMPREINTE CARBONE PAR TYPE D’ÉQUIPEMENT
          </p>
          <p>
            L’empreinte est détaillée en kgCO2 équivalent selon la fabrication.
          </p>
          <hr />
          <Pie
            data={donneesRepartitionParTypeEquipement(
              presenter.indicateursImpactsEquipementsSommes,
              presenter.referentielsTypesEquipements,
              EtapesAcv.fabrication
            )}
            options={optionsCamembert}
          />
          <hr />
          <p>
            L’empreinte est détaillée en kgCO2 équivalent selon la distribution.
          </p>
          <hr />
          <Pie
            data={donneesRepartitionParTypeEquipement(
              presenter.indicateursImpactsEquipementsSommes,
              presenter.referentielsTypesEquipements,
              EtapesAcv.distribution
            )}
            options={optionsCamembert}
          />
          <hr />
          <p>
            L’empreinte est détaillée en kgCO2 équivalent selon l’utilisation.
          </p>
          <hr />
          <Pie
            data={donneesRepartitionParTypeEquipement(
              presenter.indicateursImpactsEquipementsSommes,
              presenter.referentielsTypesEquipements,
              EtapesAcv.utilisation
            )}
            options={optionsCamembert}
          />
          <hr />
          <p>
            L’empreinte est détaillée en kgCO2 équivalent selon la fin de vie.
          </p>
          <hr />
          <Pie
            data={donneesRepartitionParTypeEquipement(
              presenter.indicateursImpactsEquipementsSommes,
              presenter.referentielsTypesEquipements,
              EtapesAcv.finDeVie
            )}
            options={optionsCamembert}
          />
          <Astuce>
            Selon la phase, plusieurs opportunités de réduction s’offre à vous :
            <ul>
              <li>
                Fabrication : augmentez la durée de vie de vos équipements pour limiter le renouvellement de votre parc ;
              </li>
              <li>
                Distribution : envisagez d’optimiser votre chaîne d’approvisionnement en équipements ;
              </li>
              <li>
                Utilisation : éteignez vos appareils inutilisés, optez pour des équipements moins énergivores lors du renouvellement
                et choisissez des sources d’énergie respectueuses de l’environnement&nbsp;;
              </li>
              <li>
                Fin de vie : recyclez vos équipements dans des centres spécialisés et envisagez leur réutilisation ou revente pour prolonger leur utilité.
              </li>
            </ul>
          </Astuce>
        </div>
        <Accordeon
          idAccordion="transcription1"
          idSection="id-transcription1"
          label="Transcription des données de l’empreinte carbone par type d’équipement"
        >
          <Transcription indicateursImpactsEquipementsSommes={presenter.indicateursImpactsEquipementsSommes} />
        </Accordeon>
      </div>
      <div className="row">
        <Indicateur
          coin="bottom-right"
          texteInfoBulle="Les radiations ionisantes quantifient l’énergie libérée par une substance radioactive,  en équivalent uranium 235. Leurs expositions provoquent des dommages à l’ADN (cancer, malformations, etc.)."
          titre="Radiations ionisantes"
          unite={
            <abbr title="kilogrammes d’uranium 235 équivalent">
              kg U235 eq
            </abbr>
          }
          valeur={presenter.indicateursImpactsEquipements.radiationIonisantes}
        />
        <Indicateur
          coin="bottom-left"
          texteInfoBulle="L’épuisement des ressources mesure la diminution des matériaux ou des ressources naturelles disponibles, en kg équivalent antimoine. Cela peut conduire à de la déforestation, de la perte de biodiversité, etc."
          titre="Épuisement des ressources - minéraux et métaux"
          unite={
            <abbr title="kilogrammes d’antimoine équivalent">
              kg SB eq
            </abbr>
          }
          valeur={presenter.indicateursImpactsEquipements.epuisementDesRessources}
        />
      </div>
      <div className="row">
        <Indicateur
          coin="top-right"
          texteInfoBulle="Les particules fines (PM2,5) peuvent provenir du chauffage au bois, du trafic routier et des activités de chantier. Elles sont nocives pour la santé respiratoire et cardiovasculaire."
          titre="Émissions de particules fines"
          unite="Incidence de maladies"
          valeur={presenter.indicateursImpactsEquipements.emissionsDeParticulesFines}
        />
        <Indicateur
          coin="top-left"
          texteInfoBulle="L’acidification fait référence à la transformation de polluants en acides dans les écosystèmes, exprimée en équivalent acidification de l’eau de mer. Cela impacte la biodiversité, les bâtiments, etc."
          titre="Acidification"
          unite={
            <abbr title="molécules ion hydron équivalent">
              mol H+ eq
            </abbr>
          }
          valeur={presenter.indicateursImpactsEquipements.acidification}
        />
      </div>
    </>
  )
}
