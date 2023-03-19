import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config.json";
import { url } from "@utils/constant";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProductCategoryList: builder.mutation({
      query: () => {
        return {
          url: `/products/product-category/list/${config.businessId}`,
          method: "GET",
        };
      },
    }),
    getProductList: builder.mutation({
      query: () => {
        return {
          url: `/v2/products/list/${config.businessId}`,
          method: "GET",
        };
      },
    }),
    getTopProductList: builder.mutation({
      query: () => {
        return {
          url: `/products/list/${
            config.businessId
          }?ids=${config?.appHomePage?.topProducts?.map((o) => o)}`,
          method: "GET",
        };
      },
    }),
    getProductDetails: builder.mutation({
      query: (params) => {
        return {
          url: `/products/details/${params.id}`,
          method: "GET",
        };
      },
    }),
    userCanReviewCheck: builder.mutation({
      query: (params) => {
        return {
          url: `/products/check/review/${params.id}`,
          method: "GET",
          headers: {
            Authorization: `token ${params.token}`,
          },
        };
      },
    }),
    productCommentList: builder.mutation({
      query: (params) => {
        return {
          url: `/products/comment/list/${params.id}`,
          method: "GET",
          headers: {
            Authorization: `token ${params.token}`,
          },
        };
      },
    }),
    deleteCommentReview: builder.mutation({
      query: (params) => {
        return {
          url: `/products/comment/delete/${params.id}`,
          method: "DELETE",
          headers: {
            Authorization: `token ${params.token}`,
          },
        };
      },
    }),
    getRecentProductList: builder.mutation({
      query: (params) => {
        return {
          url: `/products/list/${
            config.businessId
          }?ids=${params.recentProducts?.map((o) => o)}`,
          method: "GET",
        };
      },
    }),
    getReletedProductList: builder.mutation({
      query: (params) => {
        let url = `/v2/product/list/${config.businessId}?category=${params.getProductDetailsData?.category}`;
        if (params.getProductDetailsData?.sub_category) {
          url =
            url + `&sub_category=${params.getProductDetailsData?.sub_category}`;
        }
        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetProductCategoryListMutation,
  useGetProductListMutation,
  useGetTopProductListMutation,
  useGetProductDetailsMutation,
  useUserCanReviewCheckMutation,
  useProductCommentListMutation,
  useDeleteCommentReviewMutation,
  useGetRecentProductListMutation,
  useGetReletedProductListMutation,
} = productApi;
