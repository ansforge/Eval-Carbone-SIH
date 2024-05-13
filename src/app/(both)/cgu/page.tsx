import { Metadata } from 'next'
import { ReactElement } from 'react'

import Cgu from '../../../components/Cgu/Cgu'

const title = 'Conditions générales d’utilisation'
export const metadata: Metadata = {
  title,
}

export default function Page(): ReactElement {
  return (
    <Cgu />
  )
}
