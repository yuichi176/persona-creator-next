import styles from './Layout.module.css'
import clsx from 'clsx'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
        <div className={clsx(styles.corner, styles.topLeft)}></div>
        <div className={clsx(styles.corner, styles.topRight)}></div>
        <div className={clsx(styles.corner, styles.bottomLeft)}></div>
        <div className={clsx(styles.corner, styles.bottomRight)}></div>
      </main>
    </>
  )
}
