import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const session = await getSession();
      const token = session?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "all-products",
    "distributor-products",
    "distributor-product-details",
    "agent-products",
    "agent-product-details",
    "warehouse-products",
    "warehouse-product",
    "Users",
    "User",
    "Roles",
    "Role",
    "Sizes",
    "Size",
    "Colors",
    "Color",
    "Units",
    "Unit",
    "Categories",
    "Category",
    "Products",
    "Product",
    "ProductVariations",
    "ProductVariation",
    "Warehouses",
    "Warehouse",
    "Suppliers",
    "Supplier",
    "PurchaseOrders",
    "PurchaseOrder",
    "Requisitions",
    "Requisition",
    "Warehouse-users",
    "distributorUsers",
    "distributorUser",
    "agentUsers",
    "agentUser",
    "Deliveries",
    "Delivery",
    "Payments",
    "Coupons",
    "Coupon",
    "FeaturedCategories",
  ],
  endpoints: (builder) => ({}),
});
