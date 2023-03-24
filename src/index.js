import React from 'react';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
// import { userApi } from "./api/userApi";
import { productApi } from "./api/productApi";
// import { notificationApi } from "./api/notificationApi";
// import { promotionApi } from "./api/promotionApi";
// import { businessApi } from "./api/businessApi";
// import { orderApi } from "./api/orderApi";
// import { coinApi } from "./api/coinApi";
// import { blogApi } from "./api/blogApi";
// import { subcriptionApi } from "./api/subcriptionApi";
import logger from "redux-logger";
// import userReducer from "./reducers/user";
// import cartList from "./reducers/cart";
// import recentProductList from "./reducers/product";
// import activeOrder from "./reducers/activeOrder";
// import order from "./reducers/order";



const reducers = combineReducers({
  // [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  // [notificationApi.reducerPath]: notificationApi.reducer,
  // [promotionApi.reducerPath]: promotionApi.reducer,
  // [businessApi.reducerPath]: businessApi.reducer,
  // [orderApi.reducerPath]: orderApi.reducer,
  // [coinApi.reducerPath]: coinApi.reducer,
  // [subcriptionApi.reducerPath]: subcriptionApi.reducer,
  // [blogApi.reducerPath]: blogApi.reducer,
  // auth: userReducer,
  // cart: cartList,
  // recentProduct: recentProductList,
  // activeOrderConfig: activeOrder,
  // order,
});

const rootReducers = (state, action) => {
  // It's will for custom action for global level.
  if (action.type === "RESET_STATE") {
    state = {
      ...state,
      auth: null,
    };
  }

  return reducers(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["order"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      // userApi.middleware,
      productApi.middleware,
      // notificationApi.middleware,
      // promotionApi.middleware,
      // businessApi.middleware,
      // orderApi.middleware,
      // coinApi.middleware,
      // blogApi.middleware,
      // subcriptionApi.middleware,
      logger
    ),
});

const persistor = persistStore(store);

const WAProvider = (props)=>{

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>{props.children}</PersistGate>
  </Provider>
  )
};

export default WAProvider;
export  {
  productApi,
};
