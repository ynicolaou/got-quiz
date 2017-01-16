import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import App from './containers/App'

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)
