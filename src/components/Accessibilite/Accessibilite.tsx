import Link from 'next/link'
import { ReactElement } from 'react'

export default function Accessibilite(): ReactElement {
  return (
    <>
      <h1 className="fw-bold">
        Accessibilité
      </h1>
      <p>
        Nous nous engageons à rendre notre site web accessible à tous les utilisateurs, conformément aux exigences légales en matière d’accessibilité numérique.
      </p>
      <p>
        Nous utilisons le Design System de l’Agence du Numérique (ANS), conçu pour garantir une expérience utilisateur inclusive et accessible.
        Malgré cela, nous reconnaissons que l’absence d’audit RGAA signifie que notre site ne répond pas pleinement aux normes d’accessibilité requises
        et est donc « non conforme ».
      </p>
      <p>
        Nous travaillons activement à améliorer l’accessibilité de notre site et à nous conformer aux normes internationales d’accessibilité.
        Vos commentaires et suggestions sont les bienvenus pour nous aider dans cet effort.
        Si vous rencontrez des difficultés d’accessibilité lors de votre navigation sur notre site, veuillez
        {' '}
        <Link
          className="external-link"
          href="mailto:eval-carbone-sih@esante.gouv.fr"
        >
          nous contacter
        </Link>
        {' '}
        afin que nous puissions prendre des mesures correctives.
      </p>
    </>
  )
}
