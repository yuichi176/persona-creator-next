import { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { env } from '@/config/env'

export async function POST(request: NextRequest) {
  const headersList = headers()
  const headersObj = Object.fromEntries(headersList.entries())
  const body = await request.json()

  return await fetch(`${env.PERSONA_CREATOR_API_BASE_URL}/persona/streamGenerateContent`, {
    method: 'POST',
    headers: {
      ...headersObj,
    },
    body: JSON.stringify(body),
  })
}
