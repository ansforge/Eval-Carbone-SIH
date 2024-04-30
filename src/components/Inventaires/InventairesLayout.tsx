import Link from 'next/link'
import { ReactElement } from 'react'

import Inventaires from './Inventaires'
import InventairesVide from './InventairesVide'
import InfoBulle from '../commun/Infobulle'
import { InventaireViewModel } from '../viewModel'

type InventairesLayoutProps = Readonly<{
  inventairesViewModel: InventaireViewModel[]
  isAdmin: boolean
}>

export default function InventairesLayout({ inventairesViewModel, isAdmin }: InventairesLayoutProps): ReactElement {
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
          !isAdmin && (
            <div>
              <Link
                className="btn btn--plain btn--primary"
                href="creer-un-inventaire"
              >
                Créer un inventaire
              </Link>
            </div>
          )
        }
      </div>
      <hr />
      {
        inventairesViewModel.length > 0 ? (
          <Inventaires inventairesViewModel={inventairesViewModel} />
        ) : (
          <InventairesVide isAdmin={isAdmin} />
        )
      }
    </>
  )
}
