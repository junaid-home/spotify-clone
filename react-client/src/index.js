import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {ToastContainer} from 'react-toastify'

import App from 'App'

import {store} from 'store/index'
import {restoreUser} from 'store/reducers/auth'
import {restorePlaying} from 'store/reducers/player'

store.dispatch(restoreUser())
store.dispatch(restorePlaying())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>,
)
