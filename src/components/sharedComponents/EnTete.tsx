'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ClientSafeProvider } from 'next-auth/react'
import { ReactElement, ReactNode } from 'react'

import Deconnexion from './Deconnexion'
import { ProfilAtih } from '../../authentification'
import Connexion from '../Connexion/Connexion'

type EnTeteProps = Readonly<{
  profil: ProfilAtih
  providers?: Readonly<Record<'pasrel', ClientSafeProvider>>
}>

type Menu = Readonly<{
  isDisplayed: boolean
  label: string
  path: string
}>

export default function EnTete({ profil, providers }: EnTeteProps): ReactElement {
  const pathname = usePathname()
  const menu: ReadonlyArray<Menu> = [
    {
      isDisplayed: true,
      label: 'Accueil',
      path: '/',
    },
    {
      isDisplayed: profil.isConnected,
      label: 'Inventaires',
      path: '/inventaires',
    },
    {
      isDisplayed: true,
      label: 'FAQ',
      path: '/faq',
    },
    {
      isDisplayed: profil.isAdmin,
      label: 'Référentiels',
      path: '/modifier-un-referentiel',
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
            EvalCarbone SIH
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
                    menu.map((menu): ReactNode => {
                      // istanbul ignore next @preserve
                      const activeClass = pathname === menu.path ? 'is-active' : ''

                      if (menu.isDisplayed) {
                        return (
                          <li
                            className={`nav-item ${activeClass} common-nav-item`}
                            key={menu.path}
                          >
                            <a
                              className="nav-link"
                              href={menu.path}
                            >
                              {menu.label}
                            </a>
                          </li>
                        )
                      }

                      return null
                    })
                  }
                  {
                    !profil.isConnected && providers ? (
                      <li className="nav-item">
                        <Connexion
                          providers={providers}
                          styleDuBouton="lien"
                        />
                      </li>
                    ) : null
                  }
                  {
                    profil.isConnected ? (
                      <li className="nav-item">
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
