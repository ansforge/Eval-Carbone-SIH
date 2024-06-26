import { DialogContent, DialogOverlay } from '@reach/dialog'
import { PropsWithChildren, ReactElement } from 'react'

type ModaleProps = PropsWithChildren<Readonly<{
  fermerLaModale: () => void
  isOpen: boolean
  titre: string
  validerLaModale: () => void
}>>

export default function Modale({ children, fermerLaModale, isOpen, titre, validerLaModale }: ModaleProps): ReactElement {
  return (
    <DialogOverlay
      isOpen={isOpen}
      onDismiss={fermerLaModale}
    >
      <DialogContent
        aria-labelledby="dialog-title"
        className="modal-dialog modal-dialog-centered"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title"
              id="dialog-title"
            >
              <svg
                aria-hidden
                className="svg-icon"
                focusable="false"
              >
                <use xlinkHref="/svg-icons/icon-sprite.svg#circle-alert" />
              </svg>
              {' '}
              {titre}
            </h1>
            <button
              className="btn btn--close btn--icon-only"
              onClick={fermerLaModale}
              type="button"
            >
              <svg
                aria-hidden
                className="svg-icon svg-close"
                focusable="false"
              >
                <use xlinkHref="svg-icons/icon-sprite.svg#close" />
              </svg>
              <span className="sr-only">
                Fermer :
                {' '}
                {titre}
              </span>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="btn-group">
            <button
              className="btn btn--ghost btn--default"
              onClick={fermerLaModale}
              type="button"
            >
              Annuler
            </button>
            <button
              className="btn btn--plain btn--primary"
              onClick={validerLaModale}
              type="button"
            >
              {titre}
            </button>
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}
