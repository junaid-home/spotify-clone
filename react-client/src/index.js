import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {ToastContainer} from 'react-toastify'

import App from 'App'

import {store} from 'store/index'
import {restoreUser} from 'store/reducers/auth'

store.dispatch(restoreUser())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
)
