import { ReactElement } from 'react'

type ModaleProps = Readonly<{
  isNonCalcule: boolean
  quantiteGlobale: number
}>

export default function Actions({ isNonCalcule, quantiteGlobale }: ModaleProps): ReactElement {
  return (
    <div className="btn-group">
      {
        isNonCalcule ? null : (
          <button
            className="btn btn--ghost btn--default"
            name="enregistrer"
            type="submit"
          >
            Enregistrer
          </button>
        )
      }
      <button
        className="btn btn--plain btn--primary"
        disabled={quantiteGlobale <= 0}
        name="calculer"
        type="submit"
      >
        Calculer l’empreinte
      </button>
    </div>
  )
}
