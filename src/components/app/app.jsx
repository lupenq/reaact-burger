import { useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import Main from '../main/main'
import Loader from 'react-loader-spinner'
import styles from './index.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getIngridients } from '../../services/slices/ingridients'

function App () {
  const dispatch = useDispatch()

  const {
    ingridientsRequest,
    requestError,
    requestSuccess,
    items
  } = useSelector(({ ingridients }) => ingridients)

  useEffect(() => {
    dispatch(getIngridients())
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <div className={styles.mainContent}>
        {
          ingridientsRequest
            ? <Loader type={'Oval'} color={'#00BFFF'} />
            : requestError
              ? <h1>Error</h1>
              : requestSuccess && <Main data={items} />
        }
      </div>
    </>
  )
}

export default App
