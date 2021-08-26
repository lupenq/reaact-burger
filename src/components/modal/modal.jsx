import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ModalOverlay from './modal-overlay/modal-overlay'
import styles from './index.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function Modal ({ children, handleClose, title }) {
  const onKeyDownCloseHandler = e => { e.key === 'Escape' && handleClose() }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDownCloseHandler)

    return () => {
      document.removeEventListener('keydown', onKeyDownCloseHandler)
    }
  }, [])

  return ReactDOM.createPortal(
    <ModalOverlay onClick={handleClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <div className={styles.closeButton}><CloseIcon onClick={handleClose} /></div>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </ModalOverlay>,
    document.querySelector('#modal')
  )
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default Modal
