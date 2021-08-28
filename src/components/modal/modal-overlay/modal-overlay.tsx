import { FC } from 'react'
import styles from './index.module.css'

const ModalOverlay: FC<{onClick: () => void}> = ({ children, onClick }) => {
  return (
    <div className={styles.root} onClick={onClick}>
      {children}
    </div>
  )
}

export default ModalOverlay
