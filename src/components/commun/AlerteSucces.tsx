import { Alert } from '@reach/alert'
import { PropsWithChildren, ReactElement } from 'react'

type AlerteSuccesProps = PropsWithChildren<Readonly<{
  marge: number
}>>

export default function AlerteSucces({ children, marge }: AlerteSuccesProps): ReactElement {
  return (
    <Alert>
      <div className="row justify-content-center">
        <div
          className={`o-alert o-alert--success col-md-${marge}`}
          role="status"
        >
          <div className="o-alert__icon">
            <svg
              aria-hidden
              className="svg-icon svg-circle-check"
              focusable="false"
            >
              <use xlinkHref="svg-icons/icon-sprite.svg#circle-check" />
            </svg>
          </div>
          {children}
        </div>
      </div>
    </Alert>
  )
}
