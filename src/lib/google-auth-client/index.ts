import { GoogleAuth } from 'google-auth-library'
import { env } from '@/config/env'

const targetAudience = 'https://persona-creator-web-2lvohfo6eq-an.a.run.app/'

export async function getIdToken() {
  console.log('IGNORE_GOOGLE_AUTH', env.IGNORE_GOOGLE_AUTH)
  if (env.IGNORE_GOOGLE_AUTH) {
    return 'dummy-id-token'
  }
  const auth = new GoogleAuth()
  const client = await auth.getIdTokenClient(targetAudience)
  return await client.idTokenProvider.fetchIdToken(targetAudience)
}
