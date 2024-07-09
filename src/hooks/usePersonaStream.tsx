import { useCallback, useState } from 'react'
import { generatePersonaStream } from '@/lib/persona-creator-api-client/generateContent'

export type PersonaStream =
  | {
      status: 'before_generate' | 'loading' | 'error'
      data: undefined
    }
  | {
      status: 'generating' | 'success'
      data: string
    }

export const usePersonaStream = (): {
  personaStream: PersonaStream
  generatePersonaProfile: (
    age: string,
    gender: string,
    location: string,
    otherFeatures: string,
  ) => Promise<void>
  resetPersonaStream: () => void
} => {
  const [personaStream, setPersonaStream] = useState<PersonaStream>({
    status: 'before_generate',
    data: undefined,
  })

  const generatePersonaProfile = useCallback(
    async (age: string, gender: string, location: string, otherFeatures: string) => {
      setPersonaStream({
        status: 'loading',
        data: undefined,
      })
      const data = await generatePersonaStream({
        age: age,
        gender: gender,
        location: location,
        otherFeatures: otherFeatures,
      })
      if (data.error !== undefined) {
        setPersonaStream({
          status: 'error',
          data: undefined,
        })
        return
      }
      const reader = data.data.getReader()

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          setPersonaStream((prev) => ({
            status: 'success',
            data: prev.data ? prev.data : '',
          }))
          break
        }
        setPersonaStream((prev) => ({
          status: 'generating',
          data: prev.data ? prev.data + value : '' + value,
        }))
      }
    },
    [],
  )

  const resetPersonaStream = useCallback(() => {
    setPersonaStream({
      status: 'before_generate',
      data: undefined,
    })
  }, [])

  return { personaStream, generatePersonaProfile, resetPersonaStream }
}
