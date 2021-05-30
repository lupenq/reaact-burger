import { useState, useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import Main from '../main/main'
import Loader from 'react-loader-spinner'
import styles from './index.module.css'

import { API_URL } from '../../utils/constants'

function App () {
  const [ingridients, setIngridients] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(({ data }) => {
        setIngridients(data)
        setIsLoading(false)
      })
      .catch(err => {
        setErrorMessage(err.message)
        setIsLoading(false)
      })
  }, [])

  return (
    <div>
      <AppHeader />
      <div className={styles.mainContent}>
        {
          isLoading
            ? <Loader type={'Oval'} color={'#00BFFF'} />
            : errorMessage
              ? <h1>{errorMessage}</h1>
              : <Main data={ingridients} />
        }
      </div>
    </div>
  )
}

export default App
