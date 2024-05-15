'use client'

import Link from 'next/link'
import { ReactElement } from 'react'

import Inventaires from './Inventaires'
import styles from './Inventaires.module.css'
import InventairesVide from './InventairesVide'
import { useInventaires } from './useInventaires'
import { InventairesPresenter } from '../../presenters/inventairesPresenter'
import InfoBulle from '../sharedComponents/Infobulle'

type InventairesLayoutProps = Readonly<{
  presenter: InventairesPresenter
}>

export default function InventairesLayout({ presenter }: InventairesLayoutProps): ReactElement {
  const { comparerDeuxInventaires, isDisabled, mettreAJourNombreInventaireCoche } = useInventaires()

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h1 className="fw-bold">
            Inventaires
            <InfoBulle label="Un inventaire est la liste détaillée d’un parc informatique, soit la liste d’équipements (ordinateurs, serveurs, etc.). L’empreinte environnementale est calculée en fonction de l’inventaire." />
          </h1>
          <div>
            Retrouvez vos inventaires et consultez leur empreinte environnementale.
          </div>
        </div>
        {
          !presenter.isAdmin ? (
            <div className="btn-group">
              <button
                className={`btn btn--ghost btn--default ${styles.fix}`}
                disabled={isDisabled}
                onClick={comparerDeuxInventaires}
                type="button"
              >
                Comparer deux inventaires
              </button>
              <Link
                className={`btn btn--plain btn--primary ${styles.middle} ${styles.fix}`}
                href="creer-un-inventaire"
              >
                Créer un inventaire
              </Link>
            </div>
          ) : (
            <div>
              <Link
                className="btn btn--ghost btn--default"
                href="/api/exporter-les-inventaires"
              >
                <svg
                  aria-hidden
                  className="svg-icon svg-download mr-1"
                  focusable="false"
                >
                  <use xlinkHref="/svg-icons/icon-sprite.svg#download" />
                </svg>
                Exporter les inventaires
              </Link>
            </div>
          )
        }
      </div>
      <hr />
      {
        presenter.inventaires.length > 0 ? (
          <Inventaires
            inventaires={presenter.inventaires}
            isAdmin={presenter.isAdmin}
            mettreAJourNombreInventaireCoche={mettreAJourNombreInventaireCoche}
            pageCourante={presenter.pageCourante}
            totalInventaires={presenter.totalInventaires}
          />
        ) : (
          <InventairesVide isAdmin={presenter.isAdmin} />
        )
      }
    </>
  )
}
