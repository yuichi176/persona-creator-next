type Env = {
  PERSONA_CREATOR_API_BASE_URL: string
  IGNORE_GOOGLE_AUTH: boolean
}

export const env: Env = {
  PERSONA_CREATOR_API_BASE_URL: process.env.PERSONA_CREATOR_API_BASE_URL ?? 'http://localhost:8080',
  IGNORE_GOOGLE_AUTH: process.env.IGNORE_GOOGLE_AUTH === 'true',
}
