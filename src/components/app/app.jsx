import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppHeader from '../app-header/app-header'
import { Router } from '../Router'
import { useDispatch } from 'react-redux'
import { getIngridients } from '../../services/slices/ingridients'
import { loadUserData } from '../../services/slices/user'

function App () {
  const dispatch = useDispatch()

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
