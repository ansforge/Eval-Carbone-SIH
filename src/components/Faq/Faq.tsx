import { ReactElement } from 'react'

import Accordeon from '../sharedComponents/Accordeon'

export default function Faq(): ReactElement {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1 className="fw-bold">
            Foire aux questions
          </h1>
          <p>
            Découvrez notre FAQ pour des réponses à vos questions les plus courantes. Parcourez les rubriques pour trouver rapidement ce que vous cherchez.
          </p>
        </div>
      </div>
      <Accordeon
        idAccordion="question1"
        idSection="id-question1"
        label="Qu’est-ce que l’équivalent CO2 ?"
      >
        <p>
          Le terme “équivalent CO₂” (CO2 eq) est une unité de mesure créée par le GIEC (Groupe d’experts Intergouvernemental
          sur l’Évolution du Climat). Il sert à quantifier l’impact des différents gaz à effet de serre (méthane, protoxyde
          d’azote…) sur l’environnement sur la base de leur « potentiel de réchauffement global » (PRG), en prenant comme
          référence le dioxyde de carbone (CO₂) pour simplifier la mesure.
          <br />
          Les calculs du CO2eq se réalisent sur l’ensemble du cycle de vie d’un produit ou service :
        </p>
        <ul>
          <li>
            production (récolte, fabrication, transformation...) ;
          </li>
          <li>
            distribution (transport, stockage, conditionnement...) ;
          </li>
          <li>
            consommation (transports après achat, utilisation...) ;
          </li>
          <li>
            fin de vie (recyclage, réutilisation, incinération, enfouissement...).
          </li>
        </ul>
        <p>
          Ces calculs déterminent des facteurs d’impact d’empreinte carbone, partagés dans des bases d’impact tel que
          EcoInvent, Base Empreinte, NegaOctet, etc.
        </p>
      </Accordeon>
      <Accordeon
        idAccordion="question2"
        idSection="id-question2"
        label="Que puis-je faire si la fabrication est la plus grande source d’empreinte carbone de inventaire ?"
      >
        <p>
          Lorsque la fabrication est la plus grande source d’empreinte carbone, c’est l’acte d’achat d’un matériel neuf qui est la plus impactante.
          <br />
          Il existe plusieurs moyens pour faire baisser cet impact :
        </p>
        <ul>
          <li>
            intégrer du matériel reconditionné, dans le respect des besoins de performance et  de cybersécurité lié aux établissements de santé ;
          </li>
          <li>
            augmenter la durée de vie du matériel pour acheter moins en ayant toujours autant ;
          </li>
          <li>
            étudier les besoins de matériels et ajuster les quantités au juste nécessaire (⚠️ ne pas dégrader les conditions d’exercices des professionnels).
          </li>
        </ul>
      </Accordeon>
      <Accordeon
        idAccordion="question3"
        idSection="id-question3"
        label="Comment sont calculés les indicateurs d’empreinte environnementale ?"
      >
        <p>
          EvalCarbone SIH utilise la solution NumEcoEval permettant de calculer l’empreinte environnementale d’un système d’information,
          développée par le Ministère de la Transition Écologique (MTE).
        </p>
        <p>
          Ce choix s’explique par la volonté de la Délégation au numérique en santé et de l’Agence du numérique en santé de s’inscrire
          dans les travaux du MTE et de l’ADEME sur les
          {' '}
          <a
            className="external-link"
            href="https://codde.fr/evenement/ademe-publication-du-pcr-services-numeriques"
            rel="external noopener noreferrer"
            target="_blank"
            title="PCR (Product Category Rules) (nouvelle fenêtre)"
          >
            RCP
          </a>
          {' '}
          (« Règles par Catégorie de Produit » dont l’objectif est de fournir
          une méthode précise pour évaluer des impacts environnementaux afin d’uniformiser les procédés).
        </p>
        <p>
          Dans cette approche, le système d’information est défini comme l’ensemble des équipements physiques,
          des machines virtuelles et des applications gérés par une organisation.
        </p>
        <p>
          NumEcoEval utilise les données d’inventaires saisies par les utilisateurs de EvalCarbone SIH et permet le calcul
          des indicateurs d’impact du système d’information en se basant sur les facteurs d’impacts des matériels qui le constituent,
          rapportés aux étapes du cycle de vie de chacun des matériels.
        </p>
        <p>
          La formule générale du calcul est la suivante :
          <br />
          Impact unitaire (avec par exemple, l’unité de l’impact exprimée en kgCO2 eq) = Activité (unité de l’activité = km, kWh...) x
          Facteur d’impact (unité d’impact / unité de l’activité).
        </p>
        <p>
          Les facteurs d’impacts utilisés pour les calculs sont ceux mis à disposition par le MTE, sous licence creative commons,
          de la base Resilio, avec un scope qui vise à s’élargir (peu de facteurs d’impact sont actuellement disponibles).
          Les catégories des matériels et les modèles proposés sont amenés à évoluer avec l’enrichissement de ce référentiel.
        </p>
      </Accordeon>
    </>
  )
}
