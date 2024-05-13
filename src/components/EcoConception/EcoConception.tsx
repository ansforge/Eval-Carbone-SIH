import { ReactElement } from 'react'

export default function EcoConception(): ReactElement {
  return (
    <div className="wysiwyg">
      <h1 className="fw-bold">
        Éco-conception
      </h1>
      <p>
        EvalCarbone SIH permet le calcul d’empreinte environnementale des systèmes d’information de santé (SIH),
        basé sur le moteur de calcul NumEcoEval proposé par le Ministère de la Transition écologique,
        qui suit les principes décrits dans les RCP Service Numérique.
      </p>
      <p>
        EvalCarbone SIH est proposé par le GT6, groupe de travail « sobriété numérique et développement durable » créé en 2019
        au sein de la cellule éthique de la Délégation ministérielle au numérique en santé (DNS) du ministère de la santé du travail et des solidarités.
        Composé de représentants de l’écosystème santé, il vise à favoriser la réduction de l’empreinte environnementale du numérique en santé
        en adaptant la réglementation mais aussi en proposant des outils de sensibilisation à la transition écologique du numérique.
      </p>
      <p>
        L’équipe de conception et de développement a intégré, dès le début, des bonnes pratiques d’écoconception pour le développement du service.
      </p>
      <p>
        Les bonnes pratiques que nous avons appliquées :
      </p>
      <ul>
        <li>
          L’équipe a été sensibilisée aux enjeux environnementaux du numérique.
        </li>
        <li>
          EvalCarbone SIH utilise le cœur de calcul NumEcoEval, outil open source développé par le Ministère de la Transition écologique (MTE).
        </li>
        <li>
          Certains choix d’UX design ont été consciemment pris afin d’améliorer l’expérience utilisateur
          et de sélectionner uniquement les fonctionnalités les plus utiles tout en veillant au respect de la conformité RGAA. Notamment :
          <ul>
            <li>
              veiller à la sobriété des pages et du parcours principal ;
            </li>
            <li>
              privilégier les médias légers comme les pictos et illustrations ;
            </li>
            <li>
              aucun tracking n’est utilisé ;
            </li>
            <li>
              utilisation du Système de Design de l’ANS.
            </li>
          </ul>
        </li>
        <li>
          Techniquement, des technologies standards ont été utilisées.
        </li>
      </ul>
    </div>
  )
}
