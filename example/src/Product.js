import React from 'react'
import { useEffect } from 'react'
import { productApi } from 'wa-react-sdk'

function Product(props) {
  // Mutation for google place id widget
  const [
    getProductList,
    {
      isLoading: getProductListIsLoading,
      data: getProductListData,
      error: getProductListError,
      status: getProductListStatus,
      isError: getProductListIsError,
      isSuccess: getProductListIsSuccess,
      reset: getProductListReset
    }
  ] = productApi.useGetProductListMutation()

  useEffect(() => {
    console.log('test')
    getProductList()
  }, [])

  console.log('getProductListData----', getProductListData, getProductListError)

  return (
    <div>
      <p style={{ fontSize: 18 }}> {'List ---'}</p>
    </div>
  )
}

export default Product
