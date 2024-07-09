import { GoogleAuth } from 'google-auth-library'
import { env } from '@/config/env'

const targetAudience = env.PERSONA_CREATOR_API_BASE_URL

export async function getIdToken() {
  if (env.IGNORE_GOOGLE_AUTH) {
    return 'dummy-id-token'
  }
  const auth = new GoogleAuth()
  const client = await auth.getIdTokenClient(targetAudience)
  return await client.idTokenProvider.fetchIdToken(targetAudience)
}
