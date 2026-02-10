//FormData is use with file
// import axios from "axios";

import { resolveObjectURL } from "buffer";
import { initPrefersReducedMotion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadImage = async (images: FormData) => {
  console.log("image", images);
  const res = await fetch(`${API_URL}api/v1/files/upload/`, {
    method: "POST",
    // headers: {
    //   Accepts: "*/*",
    //   "Content-Type": "multipart/form-data",
    // },
    body: images,
  });
  const data = await res.json();
  return data;
};

export interface ProductRequest {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}
export interface Categories {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export const uploadProduct = async (product: ProductRequest) => {
  const response = await axios(`${API_URL}api/v1/products`, {
    method: "POST",
    headers: { Accept: "*/*", "Content-Type": "application/json" },
    data: JSON.stringify(product),
  });
};
export const getCategories = async (): Promise<Categories[]> => {
  const response = await fetch(`${API_URL}api/v1/categories`);
  const data = await response.json();
  return data;
};
function axios(arg0: string, arg1: { method: string; headers: { Accept: string; "Content-Type": string; }; data: string; }) {
  throw new Error("Function not implemented.");
}

