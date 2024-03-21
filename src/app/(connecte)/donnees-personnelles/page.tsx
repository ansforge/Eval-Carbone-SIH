import { Metadata } from 'next'
import { ReactElement } from 'react'

import DonneesPersonnelles from '../../../components/DonneesPersonnelles/DonneesPersonnelles'

const title = 'Données personnelles'
export const metadata: Metadata = {
  title,
}

export default function Page(): ReactElement {
  return (
    <DonneesPersonnelles />
  )
}
