import { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { env } from '@/config/env'
import { getIdToken } from '@/lib/google-auth-client'

export async function POST(request: NextRequest) {
  const headersList = headers()
  const headersObj = Object.fromEntries(headersList.entries())
  const body = await request.json()

  const idToken = await getIdToken()
  console.log('idToken:', idToken)

  return await fetch(`${env.PERSONA_CREATOR_API_BASE_URL}/persona/streamGenerateContent`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      ...headersObj,
    },
    body: JSON.stringify(body),
  })
}
