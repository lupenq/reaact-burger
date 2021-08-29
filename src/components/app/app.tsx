import { useEffect, FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppHeader from '../app-header/app-header'
import { Router } from '../Router'
import { getIngridients } from '../../services/slices/ingridients'
import { loadUserData } from '../../services/slices/user'
import { useAppDispatch } from '../../services/store'

const App: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getIngridients())
    dispatch(loadUserData())
  }, [dispatch])

  return (
    <BrowserRouter>
      <AppHeader />
      <Router />
    </BrowserRouter>
  )
}

export default App
