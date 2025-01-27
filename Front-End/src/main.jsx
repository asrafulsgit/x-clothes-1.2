import { createRoot } from 'react-dom/client'
import {Provider, useSelector} from 'react-redux'

import './index.css'
import userInfoStore from './Components/Authentication/Controllers/UserInfoStore.jsx'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={userInfoStore}>
     <App />
  </Provider>,
)
