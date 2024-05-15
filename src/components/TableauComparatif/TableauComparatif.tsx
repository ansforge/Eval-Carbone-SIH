import Link from 'next/link'
import { ReactElement } from 'react'

import styles from './TableauComparatif.module.css'
import { formaterDeuxChiffresApresLaVirgule } from '../../presenters/sharedPresenter'
import { TableauComparatifPresenter } from '../../presenters/tableauComparatifPresenter'
import InfoBulle from '../sharedComponents/Infobulle'

type TableauComparatifProps = Readonly<{
  presenterCompare: TableauComparatifPresenter
  presenterReference: TableauComparatifPresenter
}>

export default function TableauComparatif({
  presenterCompare,
  presenterReference,
}: TableauComparatifProps): ReactElement {
  const differenceEmpreinteCarbone =
    presenterCompare.indicateursImpactsEquipements.empreinteCarbone - presenterReference.indicateursImpactsEquipements.empreinteCarbone
  const classNameDifferenceEmpreinteCarbone = differenceEmpreinteCarbone <= 0 ? styles.differencePositive : styles.differenceNegative
  const signeDifferenceEmpreinteCarbone = differenceEmpreinteCarbone > 0 ? '+' : ''

  const differenceQuantiteEquipement = (presenterCompare.quantiteTotale - presenterReference.quantiteTotale) / presenterReference.quantiteTotale * 100
  const classNameDifferenceQuantiteEquipement = differenceQuantiteEquipement <= 0 ? styles.differencePositive : styles.differenceNegative
  const signeDifferenceQuantiteEquipement = differenceQuantiteEquipement > 0 ? '+' : ''

  const differenceDureeDeVieMoyenne = presenterCompare.dureeDeVieTotale - presenterReference.dureeDeVieTotale
  const classNameDifferenceDureeDeVieMoyenne = differenceDureeDeVieMoyenne <= 0 ? styles.differenceNegative : styles.differencePositive
  const signeDifferenceDureeDeVieMoyenne = differenceDureeDeVieMoyenne > 0 ? '+' : ''

  const differenceTauxUtilisationTotale = presenterCompare.tauxUtilisationTotale - presenterReference.tauxUtilisationTotale
  const classNameDifferenceTauxUtilisationTotale = differenceTauxUtilisationTotale <= 0 ? styles.differencePositive : styles.differenceNegative
  const signeDifferenceTauxUtilisationTotale = differenceTauxUtilisationTotale > 0 ? '+' : ''

  const differenceFabrication = presenterCompare.indicateursImpactsEquipements.fabrication - presenterReference.indicateursImpactsEquipements.fabrication
  const classNameDifferenceFabrication = differenceFabrication <= 0 ? styles.differencePositive : styles.differenceNegative
  const signeDifferenceFabrication = differenceFabrication > 0 ? '↗ +' : '↘ '

  const differenceDistribution = presenterCompare.indicateursImpactsEquipements.distribution - presenterReference.indicateursImpactsEquipements.distribution
  const classNameDifferenceDistribution = differenceDistribution <= 0 ? styles.differencePositive : styles.differenceNegative
  const signeDifferenceDistribution = differenceDistribution > 0 ? '↗ +' : '↘ '

  const differenceUtilisation = presenterCompare.indicateursImpactsEquipements.utilisation - presenterReference.indicateursImpactsEquipements.utilisation
  const classNameDifferenceUtilisation = differenceUtilisation <= 0 ? styles.differencePositive : styles.differenceNegative
  const signeDifferenceUtilisation = differenceUtilisation > 0 ? '↗ +' : '↘ '

  const differenceFinDeVie = presenterCompare.indicateursImpactsEquipements.finDeVie - presenterReference.indicateursImpactsEquipements.finDeVie
  const classNameDifferenceFinDeVie = differenceFinDeVie <= 0 ? styles.differencePositive : styles.differenceNegative
  const signeDifferenceFinDeVie = differenceFinDeVie > 0 ? '↗ +' : '↘ '

  return (
    <>
      <h1 className="fw-bold">
        Tableau comparatif
      </h1>
      <p>
        En comparant ces deux inventaires, aucune copie du tableau ne sera créée. Une fois le tableau comparatif fermé,
        si vous souhaitez revenir à la comparaison il faudra le recréer.
      </p>
      <div className="border rounded-sm top-left-radius-0 p-5 mb-5 bg-white">
        <h2 className="h3 fw-bold">
          Empreinte carbone par an
          <InfoBulle label="L’empreinte carbone mesure la quantité totale de gaz à effet de serre émise, directement ou indirectement, par une activité, un produit ou un service, exprimée en équivalent de dioxyde de carbone (CO2)." />
        </h2>
        <div className="row">
          <div className="col-md-6 border-r pr-4">
            <div className="d-flex justify-content-between mb-4">
              <div className="col-md-3">
                <svg
                  height="120"
                  width="120"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fillRule="evenodd">
                    <path
                      d="M55.31 95.511h-.002C34.703 95.511 18 79.078 18 58.806V16c2.917 3.195 8.774 5.916 20.663 6.1H55.31c20.605 0 37.308 16.433 37.308 36.706 0 20.272-16.703 36.705-37.308 36.705"
                      fill="#F2F3F7"
                    />
                    <path
                      d="M101.8 26.86v41.65c0 .674-.552 1.225-1.226 1.225h-14.7a1.23 1.23 0 0 1-1.225-1.225V26.86c0-.674.551-1.225 1.225-1.225h14.7c.674 0 1.225.551 1.225 1.225"
                      fill="#969CBB"
                    />
                    <path
                      d="M98.124 83.21v6.126A6.127 6.127 0 0 1 92 95.46a6.127 6.127 0 0 1-6.125-6.125V83.21A6.127 6.127 0 0 1 92 77.086a6.127 6.127 0 0 1 6.125 6.125"
                      fill="#D20050"
                    />
                    <path
                      d="M77.3 56.26v3.676a2.457 2.457 0 0 1-2.45 2.45h-44.1a2.457 2.457 0 0 1-2.45-2.45V56.26h49"
                      fill="#1D71B8"
                    />
                    <path
                      d="M74.85 52.586V31.76c0-.674-.552-1.225-1.226-1.225h-41.65c-.674 0-1.225.55-1.225 1.225v20.825c0 .674.551 1.225 1.225 1.225h41.65c.674 0 1.225-.551 1.225-1.225m2.45-22.05V56.26h-49V30.536a2.457 2.457 0 0 1 2.45-2.45h44.1a2.457 2.457 0 0 1 2.45 2.45"
                      fill="#FFF"
                    />
                    <path
                      d="M74.85 31.76v20.826c0 .674-.552 1.224-1.226 1.224h-41.65a1.23 1.23 0 0 1-1.225-1.224V31.76c0-.674.551-1.226 1.225-1.226h41.65c.674 0 1.225.552 1.225 1.226"
                      fill="#EDEEF3"
                    />
                    <path
                      d="m57.699 62.386 1.225 7.35h-12.25l1.225-7.35z"
                      fill="#969CBB"
                    />
                    <path
                      d="M76.074 77.086h-46.55c-.674 0-1.225.55-1.225 1.225v19.6c0 .674.551 1.225 1.225 1.225h46.55c.674 0 1.225-.551 1.225-1.225v-19.6c0-.674-.55-1.225-1.225-1.225"
                      fill="#EDEEF3"
                    />
                    <path
                      d="M74.85 61.436H30.747c-.827 0-1.5-.673-1.5-1.5v-29.4c0-.828.673-1.5 1.5-1.5H74.85c.827 0 1.5.672 1.5 1.5V55.31H33.2a.951.951 0 0 0 0 1.9h43.15v2.725c0 .827-.673 1.5-1.5 1.5M57.8 68.786H47.795l.91-5.45h8.188zM74.85 27.135h-44.1a3.404 3.404 0 0 0-3.4 3.4v29.4c0 1.876 1.524 3.4 3.4 3.4h16.028l-.909 5.45h-4.094a.95.95 0 1 0 0 1.9h22.05a.95.95 0 0 0 0-1.9h-4.096l-.908-5.45h16.03c1.874 0 3.4-1.524 3.4-3.4v-29.4a3.404 3.404 0 0 0-3.4-3.4M95.4 62.386a.95.95 0 0 1-.95.95H92a.951.951 0 0 1 0-1.9h2.45a.95.95 0 0 1 .95.95m5.45 6.125a.28.28 0 0 1-.276.274h-14.7a.28.28 0 0 1-.275-.274v-41.65c0-.15.126-.276.275-.276h14.7c.15 0 .275.126.275.276zm-.276-43.826h-14.7c-1.2 0-2.175.976-2.175 2.176v41.65c0 1.199.975 2.175 2.175 2.175h14.7a2.18 2.18 0 0 0 2.176-2.175v-41.65c0-1.2-.977-2.176-2.176-2.176M91.999 78.036a5.18 5.18 0 0 0-5.175 5.175v6.125a5.18 5.18 0 0 0 5.175 5.175 5.18 5.18 0 0 0 5.175-5.175v-6.125a5.18 5.18 0 0 0-5.175-5.175m0 18.375a7.083 7.083 0 0 1-7.075-7.075v-6.125a7.083 7.083 0 0 1 7.075-7.075 7.083 7.083 0 0 1 7.075 7.075v6.125a7.083 7.083 0 0 1-7.075 7.075"
                      fill="#343852"
                    />
                    <path
                      d="M91.999 84.161a.95.95 0 0 1-.95-.95v-1.226a.95.95 0 0 1 1.9 0v1.226a.95.95 0 0 1-.95.95"
                      fill="#FFF"
                    />
                    <path
                      d="M76.074 98.186h-6.399v-5.45h6.674v5.176a.28.28 0 0 1-.275.274m-46.825-.274v-5.175h7.899v5.449h-7.624a.28.28 0 0 1-.275-.274m.275-19.875h5.175v5.449h-5.45V78.31c0-.148.126-.274.275-.274m46.825.274v5.175h-5.45v-5.45h5.175c.149 0 .275.127.275.275m-9.125 12.525h9.125v-5.45h-9.125zm-28.176 7.35h28.726v-5.45H39.048zm-2.449-14.7h6.674v-5.45h-6.674zm8.574 0h6.675v-5.45h-6.675zm8.576 0h6.675v-5.45h-6.675zm-12.25 7.35h6.675v-5.45h-6.675zm8.575 0h6.675v-5.45h-6.675zm8.575 0h6.675v-5.45h-6.675zm3.675-7.35h6.675v-5.45h-6.675zm-33.075 7.35h10.35v-5.45h-10.35zm46.825-14.7h-46.55a2.18 2.18 0 0 0-2.176 2.175v19.6c0 1.2.977 2.175 2.176 2.175h46.55a2.18 2.18 0 0 0 2.176-2.174V78.31a2.18 2.18 0 0 0-2.176-2.175"
                      fill="#343852"
                    />
                  </g>
                </svg>
              </div>
              <div className="col-md-9 mt-2">
                <p className="subtitle text-default">
                  Inventaire de référence :
                  {' '}
                  {presenterReference.nomInventaire}
                </p>
                <p className="mb-1">
                  {presenterReference.nomEtablissement}
                  {' '}
                  -
                  {' '}
                  {presenterReference.dateInventaire}
                </p>
                <Link
                  className="btn--icon-before"
                  href={presenterReference.lienIndicateursCles}
                >
                  <svg
                    aria-hidden="true"
                    className="svg-icon svg-angle-right"
                    focusable="false"
                  >
                    <use xlinkHref="svg-icons/icon-sprite.svg#angle-right" />
                  </svg>
                  Voir l’inventaire
                </Link>
              </div>
            </div>
            <div className={`border rounded-sm top-left-radius-0 p-3 mb-4 ${styles.indicateur}`}>
              <div className={`row align-items-center ${styles.hauteur}`}>
                <div className="col-md-4">
                  <div className="h1 fw-bold">
                    {formaterDeuxChiffresApresLaVirgule(presenterReference.indicateursImpactsEquipements.empreinteCarbone)}
                  </div>
                  <div>
                    <abbr title="tonnes équivalent en dioxyde de carbone">
                      tCO2 eq
                    </abbr>
                  </div>
                </div>
              </div>
              <hr />
              <div className="h5">
                Soit autant d’émissions que :
              </div>
              <div>
                🚗
                {' '}
                <span className="fw-semiBold">
                  {presenterReference.indicateursImpactsEquipements.kilometresEnVoiture}
                </span>
                {' '}
                kilomètres en voiture
              </div>
            </div>
            <div className="border rounded-sm top-left-radius-0 p-2 mb-4">
              <h2 className="h5 mb-4">
                Détail de l’empreinte carbone de l’inventaire
              </h2>
              <div className="d-flex justify-content-between">
                <div className="col-md-4">
                  Fabrication
                </div>
                <div className="col-md-8 fw-semiBold text-right">
                  {formaterDeuxChiffresApresLaVirgule(presenterReference.indicateursImpactsEquipements.fabrication)}
                  {' '}
                  tCO2 eq
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="col-md-4">
                  Distribution
                </div>
                <div className="col-md-8 fw-semiBold text-right">
                  {formaterDeuxChiffresApresLaVirgule(presenterReference.indicateursImpactsEquipements.distribution)}
                  {' '}
                  tCO2 eq
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="col-md-4">
                  Utilisation
                </div>
                <div className="col-md-8 fw-semiBold text-right">
                  {formaterDeuxChiffresApresLaVirgule(presenterReference.indicateursImpactsEquipements.utilisation)}
                  {' '}
                  tCO2 eq
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <div className="col-md-4">
                  Fin de vie
                </div>
                <div className="col-md-8 fw-semiBold text-right">
                  {formaterDeuxChiffresApresLaVirgule(presenterReference.indicateursImpactsEquipements.finDeVie)}
                  {' '}
                  tCO2 eq
                </div>
              </div>
            </div>
            <div className={`border rounded-sm top-left-radius-0 p-3 mb-4 ${styles.indicateur}`}>
              <p className="fw-bold">
                Quantité d’équipements
              </p>
              <div className={`row align-items-center ${styles.hauteur}`}>
                <div className="col-md-4">
                  <div className="h1 fw-bold">
                    {presenterReference.quantiteTotale}
                  </div>
                  <div>
                    équipements
                  </div>
                </div>
              </div>
            </div>
            <div className={`border rounded-sm top-left-radius-0 p-3 mb-4 ${styles.indicateur}`}>
              <p className="fw-bold">
                Durée de vie moyenne des équipements
              </p>
              <div className={`row align-items-center ${styles.hauteur}`}>
                <div className="col-md-4">
                  <div className="h1 fw-bold">
                    {formaterDeuxChiffresApresLaVirgule(presenterReference.dureeDeVieTotale)}
                  </div>
                  <div>
                    ans
                  </div>
                </div>
              </div>
            </div>
            <div className={`border rounded-sm top-left-radius-0 p-3 mb-4 ${styles.indicateur}`}>
              <p className="fw-bold">
                Temps d’utilisation moyen par jour
              </p>
              <div className={`row align-items-center ${styles.hauteur}`}>
                <div className="col-md-4">
                  <div className="h1 fw-bold">
                    {formaterDeuxChiffresApresLaVirgule(presenterReference.tauxUtilisationTotale)}
                  </div>
                  <div>
                    heures
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 border-left pl-4">
            <div className="d-flex justify-content-between mb-4">
              <div className="col-md-3">
                <svg
                  height="120"
                  width="120"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fillRule="evenodd">
                    <path
                      d="M55.31 95.511h-.002C34.703 95.511 18 79.078 18 58.806V16c2.917 3.195 8.774 5.916 20.663 6.1H55.31c20.605 0 37.308 16.433 37.308 36.706 0 20.272-16.703 36.705-37.308 36.705"
                      fill="#F2F3F7"
                    />
                    <path
                      d="M101.8 26.86v41.65c0 .674-.552 1.225-1.226 1.225h-14.7a1.23 1.23 0 0 1-1.225-1.225V26.86c0-.674.551-1.225 1.225-1.225h14.7c.674 0 1.225.551 1.225 1.225"
                      fill="#969CBB"
                    />
                    <path
                      d="M98.124 83.21v6.126A6.127 6.127 0 0 1 92 95.46a6.127 6.127 0 0 1-6.125-6.125V83.21A6.127 6.127 0 0 1 92 77.086a6.127 6.127 0 0 1 6.125 6.125"
                      fill="#D20050"
                    />
                    <path
                      d="M77.3 56.26v3.676a2.457 2.457 0 0 1-2.45 2.45h-44.1a2.457 2.457 0 0 1-2.45-2.45V56.26h49"
                      fill="#1D71B8"
                    />
                    <path
                      d="M74.85 52.586V31.76c0-.674-.552-1.225-1.226-1.225h-41.65c-.674 0-1.225.55-1.225 1.225v20.825c0 .674.551 1.225 1.225 1.225h41.65c.674 0 1.225-.551 1.225-1.225m2.45-22.05V56.26h-49V30.536a2.457 2.457 0 0 1 2.45-2.45h44.1a2.457 2.457 0 0 1 2.45 2.45"
                      fill="#FFF"
                    />
                    <path
                      d="M74.85 31.76v20.826c0 .674-.552 1.224-1.226 1.224h-41.65a1.23 1.23 0 0 1-1.225-1.224V31.76c0-.674.551-1.226 1.225-1.226h41.65c.674 0 1.225.552 1.225 1.226"
                      fill="#EDEEF3"
                    />
                    <path
                      d="m57.699 62.386 1.225 7.35h-12.25l1.225-7.35z"
                      fill="#969CBB"
                    />
                    <path
                      d="M76.074 77.086h-46.55c-.674 0-1.225.55-1.225 1.225v19.6c0 .674.551 1.225 1.225 1.225h46.55c.674 0 1.225-.551 1.225-1.225v-19.6c0-.674-.55-1.225-1.225-1.225"
                      fill="#EDEEF3"
                    />
                    <path
                      d="M74.85 61.436H30.747c-.827 0-1.5-.673-1.5-1.5v-29.4c0-.828.673-1.5 1.5-1.5H74.85c.827 0 1.5.672 1.5 1.5V55.31H33.2a.951.951 0 0 0 0 1.9h43.15v2.725c0 .827-.673 1.5-1.5 1.5M57.8 68.786H47.795l.91-5.45h8.188zM74.85 27.135h-44.1a3.404 3.404 0 0 0-3.4 3.4v29.4c0 1.876 1.524 3.4 3.4 3.4h16.028l-.909 5.45h-4.094a.95.95 0 1 0 0 1.9h22.05a.95.95 0 0 0 0-1.9h-4.096l-.908-5.45h16.03c1.874 0 3.4-1.524 3.4-3.4v-29.4a3.404 3.404 0 0 0-3.4-3.4M95.4 62.386a.95.95 0 0 1-.95.95H92a.951.951 0 0 1 0-1.9h2.45a.95.95 0 0 1 .95.95m5.45 6.125a.28.28 0 0 1-.276.274h-14.7a.28.28 0 0 1-.275-.274v-41.65c0-.15.126-.276.275-.276h14.7c.15 0 .275.126.275.276zm-.276-43.826h-14.7c-1.2 0-2.175.976-2.175 2.176v41.65c0 1.199.975 2.175 2.175 2.175h14.7a2.18 2.18 0 0 0 2.176-2.175v-41.65c0-1.2-.977-2.176-2.176-2.176M91.999 78.036a5.18 5.18 0 0 0-5.175 5.175v6.125a5.18 5.18 0 0 0 5.175 5.175 5.18 5.18 0 0 0 5.175-5.175v-6.125a5.18 5.18 0 0 0-5.175-5.175m0 18.375a7.083 7.083 0 0 1-7.075-7.075v-6.125a7.083 7.083 0 0 1 7.075-7.075 7.083 7.083 0 0 1 7.075 7.075v6.125a7.083 7.083 0 0 1-7.075 7.075"
                      fill="#343852"
                    />
                    <path
                      d="M91.999 84.161a.95.95 0 0 1-.95-.95v-1.226a.95.95 0 0 1 1.9 0v1.226a.95.95 0 0 1-.95.95"
                      fill="#FFF"
                    />
                    <path
                      d="M76.074 98.186h-6.399v-5.45h6.674v5.176a.28.28 0 0 1-.275.274m-46.825-.274v-5.175h7.899v5.449h-7.624a.28.28 0 0 1-.275-.274m.275-19.875h5.175v5.449h-5.45V78.31c0-.148.126-.274.275-.274m46.825.274v5.175h-5.45v-5.45h5.175c.149 0 .275.127.275.275m-9.125 12.525h9.125v-5.45h-9.125zm-28.176 7.35h28.726v-5.45H39.048zm-2.449-14.7h6.674v-5.45h-6.674zm8.574 0h6.675v-5.45h-6.675zm8.576 0h6.675v-5.45h-6.675zm-12.25 7.35h6.675v-5.45h-6.675zm8.575 0h6.675v-5.45h-6.675zm8.575 0h6.675v-5.45h-6.675zm3.675-7.35h6.675v-5.45h-6.675zm-33.075 7.35h10.35v-5.45h-10.35zm46.825-14.7h-46.55a2.18 2.18 0 0 0-2.176 2.175v19.6c0 1.2.977 2.175 2.176 2.175h46.55a2.18 2.18 0 0 0 2.176-2.174V78.31a2.18 2.18 0 0 0-2.176-2.175"
                      fill="#343852"
                    />
                  </g>
                </svg>
              </div>
              <div className="col-md-9 mt-2">
                <p className="subtitle text-default">
                  Inventaire comparé :
                  {' '}
                  {presenterCompare.nomInventaire}
                </p>
                <p className="mb-1">
                  {presenterCompare.nomEtablissement}
                  {' '}
                  -
                  {' '}
                  {presenterCompare.dateInventaire}
                </p>
                <Link
                  className="btn--icon-before"
                  href={presenterCompare.lienIndicateursCles}
                >
                  <svg
                    aria-hidden="true"
                    className="svg-icon svg-angle-right"
                    focusable="false"
                  >
                    <use xlinkHref="svg-icons/icon-sprite.svg#angle-right" />
                  </svg>
                  Voir l’inventaire
                </Link>
              </div>
            </div>
            <div className={`border rounded-sm top-left-radius-0 p-3 mb-4 ${styles.indicateur}`}>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div className="h1 fw-bold">
                    {formaterDeuxChiffresApresLaVirgule(presenterCompare.indicateursImpactsEquipements.empreinteCarbone)}
                  </div>
                  <div>
                    <abbr title="tonnes équivalent en dioxyde de carbone">
                      tCO2 eq
                    </abbr>
                  </div>
                </div>
                <div className="col-md-8">
                  <p className="mb-1">
                    Soit :
                  </p>
                  <p className={`h1 fw-bold mb-1 ${classNameDifferenceEmpreinteCarbone}`}>
                    {signeDifferenceEmpreinteCarbone}
                    {formaterDeuxChiffresApresLaVirgule(differenceEmpreinteCarbone)}
                  </p>
                  <div className={classNameDifferenceEmpreinteCarbone}>
                    tCO2 eq par rapport à l’inventaire de référence
                  </div>
                </div>
              </div>
              <hr />
              <div className="h5">
                Soit autant d’émissions que :
              </div>
              <div>
                🚗
                {' '}
                <span className="fw-semiBold">
                  {presenterCompare.indicateursImpactsEquipements.kilometresEnVoiture}
                </span>
                {' '}
                kilomètres en voiture
              </div>
            </div>
            <div className="border rounded-sm top-left-radius-0 p-2 mb-4">
              <h2 className="h5 mb-4">
                Détail de l’empreinte carbone de l’inventaire
              </h2>
              <div className="d-flex justify-content-between">
                <div className="col-md-4">
                  Fabrication
                </div>
                <div className="col-md-8 fw-semiBold text-right">
                  <span className={classNameDifferenceFabrication}>
                    {signeDifferenceFabrication}
                    {formaterDeuxChiffresApresLaVirgule(differenceFabrication)}
                  </span>
                  {' – '}
                  {formaterDeuxChiffresApresLaVirgule(presenterCompare.indicateursImpactsEquipements.fabrication)}
                  {' '}
                  tCO2 eq
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="col-md-4">
                  Distribution
                </div>
                <div className="col-md-8 fw-semiBold text-right">
                  <span className={classNameDifferenceDistribution}>
                    {signeDifferenceDistribution}
                    {formaterDeuxChiffresApresLaVirgule(differenceDistribution)}
                  </span>
                  {' – '}
                  {formaterDeuxChiffresApresLaVirgule(presenterCompare.indicateursImpactsEquipements.distribution)}
                  {' '}
                  tCO2 eq
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="col-md-4">
                  Utilisation
                </div>
                <div className="col-md-8 fw-semiBold text-right">
                  <span className={classNameDifferenceUtilisation}>
                    {signeDifferenceUtilisation}
                    {formaterDeuxChiffresApresLaVirgule(differenceUtilisation)}
                  </span>
                  {' – '}
                  {formaterDeuxChiffresApresLaVirgule(presenterCompare.indicateursImpactsEquipements.utilisation)}
                  {' '}
                  tCO2 eq
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <div className="col-md-4">
                  Fin de vie
                </div>
                <div className="col-md-8 fw-semiBold text-right">
                  <span className={classNameDifferenceFinDeVie}>
                    {signeDifferenceFinDeVie}
                    {formaterDeuxChiffresApresLaVirgule(differenceFinDeVie)}
                  </span>
                  {' – '}
                  {formaterDeuxChiffresApresLaVirgule(presenterCompare.indicateursImpactsEquipements.finDeVie)}
                  {' '}
                  tCO2 eq
                </div>
              </div>
            </div>
            <div className={`border rounded-sm top-left-radius-0 p-3 mb-4 ${styles.indicateur}`}>
              <p className="fw-bold">
                Quantité d’équipements
              </p>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div className="h1 fw-bold">
                    {presenterCompare.quantiteTotale}
                  </div>
                  <div>
                    équipements
                  </div>
                </div>
                <div className="col-md-8">
                  <p className="mb-1">
                    Soit :
                  </p>
                  <p className={`h1 fw-bold mb-1 ${classNameDifferenceQuantiteEquipement}`}>
                    {signeDifferenceQuantiteEquipement}
                    {formaterDeuxChiffresApresLaVirgule(differenceQuantiteEquipement)}
                    {' '}
                    %
                  </p>
                  <div className={classNameDifferenceQuantiteEquipement}>
                    d’équipements par rapport à l’inventaire de référence
                  </div>
                </div>
              </div>
            </div>
            <div className={`border rounded-sm top-left-radius-0 p-3 mb-4 ${styles.indicateur}`}>
              <p className="fw-bold">
                Durée de vie moyenne des équipements
              </p>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div className="h1 fw-bold">
                    {formaterDeuxChiffresApresLaVirgule(presenterCompare.dureeDeVieTotale)}
                  </div>
                  <div>
                    ans
                  </div>
                </div>
                <div className="col-md-8">
                  <p className="mb-1">
                    Soit :
                  </p>
                  <p className={`h1 fw-bold mb-1 ${classNameDifferenceDureeDeVieMoyenne}`}>
                    {signeDifferenceDureeDeVieMoyenne}
                    {formaterDeuxChiffresApresLaVirgule(differenceDureeDeVieMoyenne)}
                  </p>
                  <div className={classNameDifferenceDureeDeVieMoyenne}>
                    années par rapport à l’inventaire de référence
                  </div>
                </div>
              </div>
            </div>
            <div className={`border rounded-sm top-left-radius-0 p-3 mb-4 ${styles.indicateur}`}>
              <p className="fw-bold">
                Temps d’utilisation moyen par jour
              </p>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div className="h1 fw-bold">
                    {formaterDeuxChiffresApresLaVirgule(presenterCompare.tauxUtilisationTotale)}
                  </div>
                  <div>
                    heures
                  </div>
                </div>
                <div className="col-md-8">
                  <p className="mb-1">
                    Soit :
                  </p>
                  <p className={`h1 fw-bold mb-1 ${classNameDifferenceTauxUtilisationTotale}`}>
                    {signeDifferenceTauxUtilisationTotale}
                    {formaterDeuxChiffresApresLaVirgule(differenceTauxUtilisationTotale)}
                  </p>
                  <div className={classNameDifferenceTauxUtilisationTotale}>
                    heures par rapport à l’inventaire de référence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
