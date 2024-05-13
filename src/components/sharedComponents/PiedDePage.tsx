import Link from 'next/link'
import { ReactElement } from 'react'

export default function PiedDePage(): ReactElement {
  return (
    <footer className="footer footer-principal">
      <div className="footer__region2">
        <div className="container">
          <div className="footer-contentinfo">
            <ul className="footer-list footer-list--inline">
              <li className="footer-list__item">
                <Link href="/accessibilite">
                  Accessibilité : non conforme
                </Link>
              </li>
              <li className="footer-list__item">
                <Link href="/eco-conception">
                  Éco-conception
                </Link>
              </li>
              <li className="footer-list__item">
                <Link href="/mentions-legales">
                  Mentions légales
                </Link>
              </li>
              <li className="footer-list__item">
                <Link href="/cgu">
                  CGU
                </Link>
              </li>
              <li className="footer-list__item">
                <Link
                  className="external-link"
                  href="mailto:nathalie.baudiniere@esante.gouv.fr"
                >
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
