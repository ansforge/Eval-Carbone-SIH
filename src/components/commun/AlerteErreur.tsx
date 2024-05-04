import { Alert } from '@reach/alert'
import { PropsWithChildren, ReactElement } from 'react'

type AlerteErreurProps = PropsWithChildren<Readonly<{
  marge: number
}>>

export default function AlerteErreur({ children, marge }: AlerteErreurProps): ReactElement {
  return (
    <Alert>
      <div className="row justify-content-center">
        <div
          className={`o-alert o-alert--error col-md-${marge}`}
          role="alert"
        >
          <div className="o-alert__icon">
            <svg
              aria-hidden
              className="svg-icon svg-circle-cross"
              focusable="false"
            >
              <use xlinkHref="svg-icons/icon-sprite.svg#circle-cross" />
            </svg>
          </div>
          {children}
        </div>
      </div>
    </Alert>
  )
}
