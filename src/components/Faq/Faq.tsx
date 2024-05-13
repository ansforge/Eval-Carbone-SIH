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
          EvalCarboneSIH utilise l’outil NumEcoEval du Ministère de la Transition Ecologique (MTE) comme moteur de calcul afin d’avoir un outil
          évolutif et en accord avec les travaux nation du MTE et de l’ADEME sur les
          {' '}
          <a
            className="external-link"
            href="https://codde.fr/evenement/ademe-publication-du-pcr-services-numeriques"
            rel="external noopener noreferrer"
            target="_blank"
            title="PCR (Product Category Rules) (nouvelle fenêtre)"
          >
            PCR (Product Category Rules)
          </a>
          {' '}
          dédiés aux services numériques.
          Ce moteur utilise les données d’inventaires saisies par les utilisateurs de EvalCarboneSIH
          et assure le calcul des indicateurs en se basant sur des facteurs d’impacts liés aux différentes du cycle de vie des matériels.
          <br />
          <br />
          La formule générale est la suivante :
          <br />
          <br />
          Impact unitaire (unité de l’impact = kg CO2 eq, kg U235 eq ...) = Activité (unité de l’activité = km, kWh...)
          x Facteur d’impact (unité d’impact / unité de l’activité).
          <br />
          <br />
          Les facteurs d’impacts utilisés sont ceux mis à disposition par le MTE, sous licence creative commons de la base Resilio,
          avec un scope qui vise à s’élargir sur d’autres matériels que ceux actuellement proposés. Les catégories
          et items de l’inventaire proposé seront donc amenés à évoluer avec l’enrichissement de ce référentiel.
        </p>
      </Accordeon>
    </>
  )
}
