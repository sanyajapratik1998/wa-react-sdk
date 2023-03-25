import React from 'react'
import WAProvider from 'wa-react-sdk'
import Product from './Product'
const App = () => {
  return (
    <WAProvider>
      <Product />
    </WAProvider>
  )
}

export default App
