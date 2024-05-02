'use client'

import Link from 'next/link'
import { ReactElement } from 'react'

import styles from './Action.module.css'
import SupprimerUnInventaire from './SupprimerUnInventaire'
import { useModale } from './useModale'
import { StatutsInventaire } from '../../presenters/sharedPresenter'

type IndicateursClesProps = Readonly<{
  dateInventaire: string
  nomEtablissement: string
  nomInventaire: string
}>

export default function Actions({ dateInventaire, nomEtablissement, nomInventaire }: IndicateursClesProps): ReactElement {
  const { fermerLaModale, isOpen, ouvrirLaModale } = useModale()

  return (
    <div className="d-flex justify-content-between">
      <div>
        <div className="h3">
          {nomInventaire}
        </div>
        <div>
          {nomEtablissement.split('$$')[0]}
          {' - '}
          {dateInventaire}
        </div>
      </div>
      <div className="btn-group">
        <button
          className="btn btn--ghost btn--default"
          onClick={ouvrirLaModale}
          type="button"
        >
          {'Supprimer l’inventaire'}
        </button>
        <Link
          className={`btn btn--plain btn--primary ${styles.middle}`}
          href={`/inventaire?nomEtablissement=${encodeURI(nomEtablissement)}&nomInventaire=${encodeURI(nomInventaire)}&statut=${StatutsInventaire.TRAITE}`}
        >
          Modifier l’inventaire
        </Link>
        <SupprimerUnInventaire
          fermerLaModale={fermerLaModale}
          isOpen={isOpen}
          nomEtablissement={nomEtablissement}
          nomInventaire={nomInventaire}
        />
      </div>
    </div>
  )
}
