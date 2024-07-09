type Env = {
  PERSONA_CREATOR_API_BASE_URL: string
}

export const env: Env = {
  PERSONA_CREATOR_API_BASE_URL: process.env.PERSONA_CREATOR_API_BASE_URL ?? 'http://localhost:8080',
}
