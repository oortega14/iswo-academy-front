
import App from './App'
import './App.css'
import { AppRouter } from './AppRouter'

function AppProvider() {
  return (
    <App>
      <AppRouter />
    </App>
  )
}

export default AppProvider;