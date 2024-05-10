import { ReactElement } from 'react'

export default function AccesRapide(): ReactElement {
  return (
    <nav aria-label="Accès rapides">
      <ul className="nav-skip">
        <li>
          <a href="#main">
            Aller au contenu
          </a>
        </li>
        <li>
          <a href="#header">
            Aller à la navigation
          </a>
        </li>
      </ul>
    </nav>
  )
}
