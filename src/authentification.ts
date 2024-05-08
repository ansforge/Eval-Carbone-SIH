/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { redirect } from 'next/navigation'
import NextAuth, { NextAuthOptions, Session, getServerSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { OAuthConfig } from 'next-auth/providers'

type Profil = Readonly<{
  profile_atih: string
  sub: string
}>

const authOptions = {
  callbacks: {
    jwt({ token, profile }): JWT {
      if (profile !== undefined) {
        // @ts-expect-error
        token.profile_atih = profile.profile_atih.profils[profile.profile_atih.idProfilSelectionne]
      }

      return token
    },
    session({ session, token }): Session {
      if (session.user !== undefined) {
        // @ts-expect-error
        session.user.profile_atih = token.profile_atih
      }

      return session
    },
  },
  debug: process.env.NODE_ENV === 'production' ? false : true,
  providers: [
    {
      authorization: {
        params: { scope: 'profile_atih' },
      },
      clientId: process.env.PROVIDER_CLIENT_ID,
      clientSecret: process.env.PROVIDER_CLIENT_SECRET,
      id: 'pasrel',
      idToken: true,
      name: 'Pasrel',
      profile(profile: Profil) {
        return {
          id: profile.sub,
        }
      },
      type: 'oauth',
      wellKnown: 'https://connect-pasrel.atih.sante.fr/cas/oidc/.well-known',
    } satisfies OAuthConfig<Profil>,
  ],
  theme: {
    brandColor: '#1d71b8',
    buttonText: '#fff',
    colorScheme: 'light',
  },
} satisfies NextAuthOptions

export const handler = NextAuth(authOptions)

export type ProfilAtih = Readonly<{
  isAdmin: boolean
  isConnected: boolean
  nomEtablissement: string
}>

export async function getProfilAtih(): Promise<ProfilAtih> {
  const niveauAdmin = 'NATIONAL'
  const session = await getServerSession(authOptions)

  if (!session) {
    return {
      isAdmin: false,
      isConnected: false,
      nomEtablissement: '',
    }
  }

  const etablissementGeographique = 'ET'
  // @ts-expect-error
  const profilsAtih = session.user.profile_atih

  let numeroFiness = profilsAtih.entite.finess ?? 'admin'

  if (profilsAtih.entite.niveau === etablissementGeographique) {
    if (profilsAtih.entite.statut[1] !== undefined) {
      numeroFiness = profilsAtih.entite.finessJuridique
    }
  }

  return {
    isAdmin: profilsAtih.niveau === niveauAdmin,
    isConnected: true,
    nomEtablissement: profilsAtih.entite.libelle + '$$' + numeroFiness,
  }
}

export async function checkIfConnected(): Promise<void> {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }
}

export async function checkIfNotConnected(): Promise<void> {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/connexion')
  }
}
