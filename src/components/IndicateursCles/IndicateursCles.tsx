'use client'

import Link from 'next/link'
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
      <div className="border rounded-sm top-left-radius-0 p-5 mb-5 bg-white">
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
      <section className="border rounded-sm top-left-radius-0 p-5 mb-3 bg-white row">
        <div className="wysiwyg col-md-6">
          <h2>
            Simulez vos réductions d’empreinte
          </h2>
          <p>
            Découvrez comment réduire votre empreinte environnementale en simulant différentes opportunités grâce à notre fonction de simulation.
            Créez une simulation de cet inventaire et saisissez vos hypothèses de réduction en jouant sur trois données :
          </p>
          <ul>
            <li>
              la durée de vie ;
            </li>
            <li>
              la quantité d’équipements ;
            </li>
            <li>
              le nombre d’heures d’utilisation.
            </li>
          </ul>
          <Link
            className={'btn btn--plain btn--primary'}
            href={encodeURI(`/creer-une-simulation?nomInventaire=${nomInventaire}`)}
          >
            Créer une simulation
          </Link>
        </div>
        <div className="col-md-6 text-center">
          <svg
            aria-hidden
            height="350"
            viewBox="0 0 120 120"
            width="350"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.62 106.013h-.001c-21.523 0-38.971-17.166-38.971-38.34V22.957c3.047 3.337 9.164 6.18 21.584 6.372H44.62c21.523 0 38.97 17.165 38.97 38.342 0 21.175-17.447 38.341-38.97 38.341"
              fill="#F2F3F7"
            />
            <path
              d="M42.157 58.478a1.2 1.2 0 0 1-.594-.16l-18.18-10.536a1.183 1.183 0 0 1-.392-1.684c7.43-11.146 19.83-18.313 33.168-19.172.325-.005.648.096.888.32.239.225.373.536.373.865v21.07c0 .602-.45 1.108-1.047 1.177-5.172.605-10.011 3.393-13.276 7.655a1.18 1.18 0 0 1-.94.465"
              fill="#969CBB"
            />
            <path
              d="M75.522 58.478c-.358 0-.71-.162-.94-.465-3.265-4.261-8.104-7.05-13.276-7.655a1.184 1.184 0 0 1-1.048-1.177V28.11a1.183 1.183 0 0 1 1.261-1.183c13.338.857 25.738 8.024 33.17 19.17a1.183 1.183 0 0 1-.394 1.685L76.116 58.318a1.2 1.2 0 0 1-.594.16"
              fill="#1D71B8"
            />
            <path
              d="M96.605 89.804a1.2 1.2 0 0 1-.593-.159L77.739 79.11a1.185 1.185 0 0 1-.491-1.508c1.046-2.352 1.576-4.919 1.576-7.63 0-2.758-.543-5.39-1.57-7.613a1.187 1.187 0 0 1 .485-1.525l18.273-10.535c.284-.163.623-.202.934-.109.313.095.573.315.72.606 2.99 5.983 4.506 12.434 4.506 19.176 0 6.743-1.516 13.195-4.506 19.177a1.19 1.19 0 0 1-1.061.656"
              fill="#D20050"
            />
            <path
              d="M21.46 89.804q-.174 0-.342-.05a1.2 1.2 0 0 1-.72-.606c-2.99-5.982-4.506-12.434-4.506-19.177 0-6.742 1.516-13.193 4.506-19.176.147-.29.407-.51.72-.606.311-.093.65-.054.934.11l18.273 10.534c.525.304.737.955.491 1.51-1.046 2.352-1.576 4.92-1.576 7.628 0 2.711.53 5.278 1.576 7.63a1.185 1.185 0 0 1-.49 1.508L22.051 89.645a1.2 1.2 0 0 1-.593.16"
              fill="#DEE0EA"
            />
            <path
              d="M59.333 76.692a8.2 8.2 0 0 1-4.347-1.248 8.2 8.2 0 0 1-3.688-5.142 8.21 8.21 0 0 1 1.027-6.242 8.23 8.23 0 0 1 6.318-3.864l12.708-15.755a1.19 1.19 0 0 1 1.61-.223l2.92 2.072c.483.343.64.99.365 1.517l-9.199 17.635a8.22 8.22 0 0 1-.676 7.342 8.2 8.2 0 0 1-5.142 3.687 8.3 8.3 0 0 1-1.896.221"
              fill="#FFF"
            />
            <path
              d="M42.156 58.479a1.2 1.2 0 0 1-.594-.16L23.383 47.782a1.185 1.185 0 0 1-.393-1.683c7.431-11.146 19.831-18.313 33.17-19.172.324-.007.647.095.886.319.24.224.374.537.374.865v21.07c0 .603-.45 1.108-1.048 1.178-5.172.604-10.01 3.392-13.273 7.655a1.19 1.19 0 0 1-.943.464M25.68 46.373l16.19 9.383c3.397-4.032 8.107-6.748 13.18-7.603v-18.76c-11.705 1.127-22.527 7.384-29.37 16.98m70.924 43.43c-.206 0-.41-.053-.592-.159L77.738 79.11a1.185 1.185 0 0 1-.49-1.51c1.045-2.351 1.575-4.918 1.575-7.628 0-2.758-.543-5.391-1.568-7.614a1.183 1.183 0 0 1 .483-1.523l18.274-10.536c.283-.164.622-.203.934-.11a1.2 1.2 0 0 1 .72.605c2.99 5.984 4.506 12.436 4.506 19.178s-1.516 13.195-4.506 19.178a1.2 1.2 0 0 1-1.062.653m-16.78-12.23 16.266 9.38c2.463-5.33 3.711-11.035 3.711-16.982s-1.248-11.653-3.71-16.981l-16.26 9.374c.894 2.3 1.363 4.907 1.363 7.607 0 2.67-.46 5.222-1.37 7.603M21.46 89.805q-.173 0-.342-.05a1.2 1.2 0 0 1-.72-.605c-2.99-5.983-4.506-12.436-4.506-19.177 0-6.742 1.516-13.194 4.506-19.177a1.186 1.186 0 0 1 1.653-.496l18.274 10.536c.526.303.738.953.491 1.508-1.045 2.352-1.575 4.92-1.575 7.629 0 2.71.53 5.277 1.575 7.629a1.185 1.185 0 0 1-.49 1.508L22.05 89.647a1.2 1.2 0 0 1-.59.157m.514-36.814c-2.464 5.328-3.71 11.035-3.71 16.982s1.246 11.653 3.71 16.982l16.266-9.38c-.91-2.38-1.37-4.931-1.37-7.602 0-2.67.46-5.221 1.37-7.602zm72.713-6.892c-7.43-11.145-19.829-18.312-33.168-19.171a1.186 1.186 0 0 0-1.262 1.184v21.07c0 .603.451 1.108 1.05 1.178 1.505.175 2.976.556 4.396 1.087l1.56-1.933a21.4 21.4 0 0 0-4.635-1.36V29.396c11.704 1.126 22.526 7.383 29.37 16.979l-16.19 9.383a22.6 22.6 0 0 0-2.43-2.451l-1.133 2.174c.84.776 1.63 1.613 2.335 2.534a1.18 1.18 0 0 0 1.535.304l18.181-10.535c.282-.165.485-.439.56-.758a1.18 1.18 0 0 0-.169-.926M59.333 76.693a8.2 8.2 0 0 1-4.348-1.248 8.2 8.2 0 0 1-3.687-5.142 8.2 8.2 0 0 1 1.028-6.242 8.22 8.22 0 0 1 6.318-3.864l12.708-15.754a1.187 1.187 0 0 1 1.61-.223l2.92 2.072c.482.343.638.99.364 1.517l-9.199 17.634a8.22 8.22 0 0 1-.676 7.343 8.2 8.2 0 0 1-5.142 3.687 8.3 8.3 0 0 1-1.896.22m13.164-29.894-12.34 15.299c-.22.274-.552.435-.902.44a5.88 5.88 0 0 0-4.915 2.773 5.86 5.86 0 0 0-.734 4.454 5.86 5.86 0 0 0 2.631 3.666 5.86 5.86 0 0 0 4.453.733 5.86 5.86 0 0 0 3.667-2.63 5.88 5.88 0 0 0 .308-5.635 1.18 1.18 0 0 1 .02-1.054l8.98-17.218z"
              fill="#343852"
            />
          </svg>
        </div>
      </section>
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
