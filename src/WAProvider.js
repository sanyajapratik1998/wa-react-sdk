import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import React from 'react'
import { persistReducer, persistStore } from 'redux-persist'
import {store} from './store'

const persistor = persistStore(store)

const WAProvider = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  )
}

export default WAProvider
