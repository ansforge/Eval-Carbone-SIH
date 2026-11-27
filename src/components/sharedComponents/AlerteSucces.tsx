import { PropsWithChildren, ReactElement } from 'react'

type AlerteSuccesProps = PropsWithChildren<Readonly<{
  marge: number
}>>

export default function AlerteSucces({ children, marge }: AlerteSuccesProps): ReactElement {
  return (
    <div className="row justify-content-center">
      {/* role="alert", like AlerteErreur: a polite status inserted already filled is often not announced. */}
      <output
        className={`o-alert o-alert--success col-md-${marge}`}
        role="alert"
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
      </output>
    </div>
  )
}
