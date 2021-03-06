import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app/app'
import { store } from './services/store'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
