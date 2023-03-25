import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    PURGE,
    REGISTER,
    REHYDRATE
  } from 'redux-persist'
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import { combineReducers } from 'redux'
  import { configureStore } from '@reduxjs/toolkit'
  import { productApi } from './api/productApi'
  import logger from 'redux-logger'
  
  const reducers = combineReducers({
    [productApi.reducerPath]: productApi.reducer
    
  })
  
  const rootReducers = (state, action) => {
    // It's will for custom action for global level.
    if (action.type === 'RESET_STATE') {
      state = {
        ...state,
        auth: null
      }
    }
  
    return reducers(state, action)
  }
  
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducers)
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }).concat(
        productApi.middleware,
        logger
      )
  })
  