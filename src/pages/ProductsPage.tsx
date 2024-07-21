
import { Button } from "@/components/ui/button";
import {
  Card,CardContent,CardDescription,
  CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { SkeletonDemo } from "@/components/SkeletonProduct";

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

interface ProductData {
  id: number;
  attributes: ProductAttributes;
}

interface ProductsResponse {
  data: ProductData[];
}

interface ProductsPageProps {
  attributes?: ProductAttributes;
}


const ProductsPage: React.FC<ProductsPageProps> = () => {
  const [data, setData] = useState<ProductsResponse>({ data: [] });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<ProductsResponse>(`${import.meta.env.VITE_SERVER_URL}/api/products?populate=categories,image`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div><SkeletonDemo /></div>;

  return (
    <section className="h-auto grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6 m-10">
      { data.data.map((i) => (
        <Card key={i.id} className="w-[350px]">
          <CardHeader>
            <CardTitle>{i.attributes.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="h-auto flex items-center justify-center">
                  <img
                    width={'200px'}
                    height={'auto'}
                    src={`${import.meta.env.VITE_SERVER_URL}${i.attributes.image.data.attributes.url}`}
                    alt={i.attributes.title}
                  />
                </div>
                <CardTitle className="py-3">Prix : $ {i.attributes.price}</CardTitle>

                <CardDescription className="py-3 flex items-center justify-between">
                  <p>Stock: {i.attributes.stock}</p>
                  
                  <p>Rate: {i.attributes.rate}</p>
                  
                </CardDescription>

                <CardDescription className="py-3">
                  {i.attributes.des}
                </CardDescription>

              </div>
            </form>
          </CardContent>
          <CardFooter>
            
            <Link className="w-full"
            to={`/Products/${i.id}`}>
                 <Button 
                 className="px-10 py-6 w-full text-xl hover:bg-red-400">
              Detail
            </Button> 
            </Link>
            
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default ProductsPage;
