/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { redirect } from 'next/navigation'
import nextAuth, { NextAuthOptions, Session, getServerSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { OAuthConfig } from 'next-auth/providers'

type Profile = Readonly<{
  profile_atih: string
  sub: string
}>

const authOptions = {
  callbacks: {
    jwt({ token, profile }): JWT {
      if (profile !== undefined) {
        // @ts-expect-error
        token.profile_atih = profile.profile_atih
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
      profile(profile: Profile) {
        return {
          id: profile.sub,
        }
      },
      type: 'oauth',
      wellKnown: 'https://connect-pasrel.atih.sante.fr/cas/oidc/.well-known',
    } satisfies OAuthConfig<Profile>,
  ],
  theme: {
    brandColor: '#1d71b8',
    buttonText: '#fff',
    colorScheme: 'light',
  },
} satisfies NextAuthOptions

export const handler = nextAuth(authOptions)

export type ProfileAtih = Readonly<{
  isAdmin: boolean
  nomEtablissement: string
}>

export async function getProfileAtih(): Promise<ProfileAtih> {
  const niveauAdmin = 'NATIONAL'
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('connexion')
  }

  let profile: ProfileAtih = {
    isAdmin: false,
    nomEtablissement: '',
  }

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  for (const profil of Object.keys(session.user.profile_atih.profils)) {
    let finess = ''

    // @ts-expect-error
    if (Number(profil) === Number(session.user.profile_atih.idProfilSelectionne)) {
      // @ts-expect-error
      finess = session.user.profile_atih.profils[profil].entite.finess

      // @ts-expect-error
      if (session.user.profile_atih.profils[profil].entite.niveau === 'ET') {
        // @ts-expect-error
        if (session.user.profile_atih.profils[profil].entite.statut[1] !== undefined) {
          // @ts-expect-error
          finess = session.user.profile_atih.profils[profil].entite.finessJuridique
        }
      }

      profile = {
        // @ts-expect-error
        isAdmin: session.user.profile_atih.profils[profil].niveau === niveauAdmin,
        // @ts-expect-error
        nomEtablissement: session.user.profile_atih.profils[profil].entite.libelle + '$$' + finess,
      }
    }
  }

  return profile
}

export async function isConnected(): Promise<void> {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }
}
