import { z } from 'zod'
import styles from './CreateFormDialog.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'

type CreateFormDialogProps = {
  onSubmit: (values: FormValue) => void
}

const formValueSchema = z.object({
  age: z
    .string()
    .min(1, { message: 'Age is required' })
    .refine((value) => !isNaN(Number(value)), { message: 'Age must be a number' })
    .refine((value) => Number(value) >= 0, { message: 'Age must be greater than 0' })
    .refine((value) => Number(value) <= 100, { message: 'Age must be less than 100' }),
  gender: z.string(),
  location: z.string().min(1, { message: 'Location is required' }),
  otherFeatures: z.string().max(200, { message: "Other feature's length must be less than 500" }),
})
export type FormValue = z.infer<typeof formValueSchema>

export const CreateFormDialog = ({ onSubmit }: CreateFormDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValue>({
    mode: 'onChange',
    defaultValues: {
      age: '',
      gender: 'Male',
      location: '',
      otherFeatures: '',
    },
    resolver: zodResolver(formValueSchema),
  })

  const generatePersonaProfile: SubmitHandler<FormValue> = useCallback(
    (values) => {
      onSubmit(values)
    },
    [onSubmit],
  )

  return (
    <form onSubmit={handleSubmit(generatePersonaProfile)}>
      <div className={styles.formFieldContainer}>
        <div className={styles.formField}>
          <label>
            <p className={styles.label}>
              Age<span className={styles.requiredText}>*required</span>
            </p>
            <input
              className={styles.textInput}
              placeholder="e.g. 25"
              autoComplete="off"
              {...register('age')}
            />
          </label>
          <p className={styles.errorMessage}>{errors.age?.message}</p>
        </div>
        <div className={styles.formField}>
          <label>
            <p className={styles.label}>
              Gender<span className={styles.requiredText}>*required</span>
            </p>
            <select className={styles.select} {...register('gender')}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>
        </div>
        <div className={styles.formField}>
          <label>
            <p className={styles.label}>
              Location<span className={styles.requiredText}>*required</span>
            </p>
            <input
              className={styles.textInput}
              placeholder="e.g. Tokyo, Japan"
              autoComplete="off"
              {...register('location')}
            />
          </label>
          <p className={styles.errorMessage}>{errors.location?.message}</p>
        </div>
        <div className={styles.formField}>
          <label>
            <p className={styles.label}>Other Features (within 200 characters)</p>
            <textarea
              className={styles.textarea}
              rows={5}
              placeholder="e.g. Occupation: Software Engineer, Education: Master's Degree, Hobbies: Hiking and Reading, Lifestyle: Vegetarian, Interests: Technology and Art"
              {...register('otherFeatures')}
            />
          </label>
          <p className={styles.errorMessage}>{errors.otherFeatures?.message}</p>
        </div>
      </div>
      <div className={styles.formButtonContainer}>
        <button type="submit" className={styles.submitButton} disabled={!isValid}>
          Create
        </button>
        <button
          className={styles.clearButton}
          onClick={() => {
            reset()
          }}
        >
          Clear
        </button>
      </div>
    </form>
  )
}
