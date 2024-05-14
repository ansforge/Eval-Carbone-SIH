import { ReactElement } from 'react'

export default function MentionsLegales(): ReactElement {
  return (
    <>
      <h1 className="fw-bold">
        Mentions légales
      </h1>
      <h2>
        Editeur
      </h2>
      <p>
        Ministère du travail de la santé et des solidarités
        <br />
        Et par délégation,
        <br />
        <br />
        Délégation au Numérique en Santé (DNS)
        <br />
        14, avenue Duquesne
        <br />
        75030 PARIS 07 SP
        <br />
        <br />
        Directeur de la publication : Madame Héla Ghariani, Déléguée au numérique en santé
      </p>
      <h2>
        Hébergeur
      </h2>
      <p>
        OVH SAS 2 rue Kellermann - 59100 Roubaix – France
      </p>
      <h2>
        Licence
      </h2>
      <p>
        Ce service utilise le code source du service
        {' '}
        <a
          className="external-link"
          href="https://gitlab-forge.din.developpement-durable.gouv.fr/pub/numeco/m4g/numecoeval"
          rel="external noopener noreferrer"
          target="_blank"
        >
          NumEcoEval
        </a>
        {' '}
        mis à disposition par le Ministère de la transition écologique.
        <br />
        Ce service utilise les facteurs d’impact environnemental du « Starter kit » de la société
        {' '}
        <a
          className="external-link"
          href="https://db.resilio.tech/kit"
          rel="external noopener noreferrer"
          target="_blank"
        >
          Resilio
        </a>
        {' '}
        .
      </p>
    </>
  )
}
