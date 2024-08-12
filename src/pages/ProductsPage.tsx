

import {CardContent} from "@/components/ui/card";

import axios from "axios";

import { SkeletonDemo } from "@/components/SkeletonProduct";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ProductCard from "@/components/ProductCard";

interface ImageFormats {
  thumbnail: {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
  };
}

interface ImageAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

interface Image {
  data: ImageData;
}

interface CategoryAttributes {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface CategoryData {
  id: number;
  attributes: CategoryAttributes;
}

interface Categories {
  data: CategoryData[];

}

interface ProductAttributes {
  title: string;
  des: string;
  price: number;
  stock: number;
  rate: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  categories: Categories;
  image: Image;
}

interface ProductsPageProps {
  attributes?: ProductAttributes;
}

interface ProductData {
  id: number;
  attributes: ProductAttributes;
}



const ProductsPage: React.FC<ProductsPageProps> = () => {


  const getProductList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products?populate=image&fields=price&fields=title`
    );
    return data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProductList,
  });

  useEffect(() => {
    document.title=`Product ${data?.data?.attributes?.title} Page`;
           }, [data])

  if (isLoading) return <CardContent><SkeletonDemo /></CardContent>;

  return (
    <CardContent className="h-auto grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 m-10">
      { data.data && data.data.map((i: ProductData) => (
        <ProductCard key={i.id} {...i} />
      ))}
    </CardContent>
  );
};

export default ProductsPage;
