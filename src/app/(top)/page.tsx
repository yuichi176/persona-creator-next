'use client'

import { useCallback, useEffect, useRef } from 'react'
import { CreateFormDialog, FormValue } from './_component/CreateFormDialog'
import { usePersonaStream } from '@/hooks/usePersonaStream.tsx'
import Markdown from 'react-markdown'
import styles from './page.module.css'

export default function TopPage() {
  const topRef = useRef<HTMLDivElement | null>(null)
  const { personaStream, generatePersonaProfile, resetPersonaStream } = usePersonaStream()

  const handleSubmit = useCallback(
    async (values: FormValue) => {
      await generatePersonaProfile(values.age, values.gender, values.location, values.otherFeatures)
    },
    [generatePersonaProfile],
  )

  const handleReGenerate = useCallback(() => {
    resetPersonaStream()
    topRef.current?.scrollIntoView(true)
  }, [resetPersonaStream])

  return (
    <div ref={topRef}>
      {(() => {
        switch (personaStream.status) {
          case 'before_generate':
            return (
              <div>
                <h1 className={styles.title}>Persona Creator</h1>
                <p className={styles.description}>
                  Please fill in the following details to generate a persona. The more specific you
                  are, the more accurate the persona will be.
                </p>
                <CreateFormDialog onSubmit={handleSubmit} />
              </div>
            )
          case 'loading':
            return (
              <div className={styles.loadMessageContainer}>
                <p>Creating a persona</p>
                <div className={styles.loadIndicator}></div>
              </div>
            )
          case 'error':
            return (
              <>
                <p className={styles.errorMessage}>Failed to create a persona.</p>
                <button
                  type="button"
                  onClick={handleReGenerate}
                  className={styles.regenerateButton}
                >
                  Retry
                </button>
              </>
            )
          case 'generating':
            return <PersonaMarkdown persona={personaStream.data}></PersonaMarkdown>
          case 'success':
            return (
              <>
                <div className={styles.resultContainer}>
                  <PersonaMarkdown persona={personaStream.data}></PersonaMarkdown>
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    type="button"
                    onClick={handleReGenerate}
                    className={styles.regenerateButton}
                  >
                    Regenerate
                  </button>
                </div>
              </>
            )
        }
      })()}
    </div>
  )
}

const PersonaMarkdown = ({ persona }: { persona: string }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const formattedPersona = persona.replace(/\\n/g, '\n')

  useEffect(() => {
    bottomRef.current?.scrollIntoView(true)
  }, [persona])

  return (
    <div>
      <Markdown className={styles.markdown}>{formattedPersona}</Markdown>
      <div ref={bottomRef} />
    </div>
  )
}
