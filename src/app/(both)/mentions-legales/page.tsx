import { Metadata } from 'next'
import { ReactElement } from 'react'

import MentionsLegales from '../../../components/MentionsLegales/MentionsLegales'

const title = 'Mentions légales'
export const metadata: Metadata = {
  title,
}

export default function Page(): ReactElement {
  return (
    <MentionsLegales />
  )
}
