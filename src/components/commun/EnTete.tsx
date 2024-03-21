'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'

import { ProfileAtih } from '../../authentification'
import Deconnexion from '../Deconnexion/Deconnexion'

type EnTeteProps = Readonly<{
  session?: ProfileAtih
}>

export default function EnTete({ session }: EnTeteProps): ReactElement {
  const pathname = usePathname()
  const menu = [
    {
      label: 'Inventaires',
      path: '/',
    },
    {
      label: 'FAQ',
      path: '/faq',
    },
  ]

  return (
    <header
      className="header header-principal"
      id="header"
    >
      <div className="header-principal__inner">
        <div className="header-principal-left">
          <div className="logos">
            <div className="logo logo--0">
              <a
                href="https://sante.gouv.fr/"
                rel="external noopener noreferrer"
                target="_blank"
              >
                <Image
                  alt="Ministère de la Santé et de la Prévention"
                  height="62"
                  src="/img/logo-ministere.svg"
                  width="107"
                />
              </a>
            </div>
            <div className="logo logo--1">
              <a
                href="https://esante.gouv.fr/"
                rel="external noopener noreferrer"
                target="_blank"
              >
                <Image
                  alt="Accueil"
                  height="50"
                  src="/img/logo-ANS.svg"
                  width="166"
                />
              </a>
            </div>
          </div>
          <div className="header__title fw-bold">
            EvalCarboneSIH
          </div>
        </div>
        <div className="header-principal-right">
          <div className="header-principal__nav">
            <div
              className="navbar navbar-expand-xl navbar-light"
              tabIndex={-1}
            >
              <nav aria-label="Menu principal">
                <ul className="navbar-nav nav-lvl--1">
                  {
                    menu.map((menu) => {
                      const activeClass = pathname === menu.path ? 'is-active' : ''

                      return (
                        <li
                          className={`nav-item ${activeClass} common-nav-item`}
                          key={menu.path}
                        >
                          <Link
                            className="nav-link"
                            href={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>

                      )
                    })
                  }
                  {
                    session ? (
                      <li className="nav-item common-nav-item">
                        <Deconnexion />
                      </li>
                    ) : null
                  }
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
