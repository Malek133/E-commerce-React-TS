

import { SkeletonDemoDetails } from "@/components/SkeletonProductDetails";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
 import { useParams,Link } from "react-router-dom";


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

const ProductDetails: React.FC<ProductsPageProps> = () => {

    // const [data, setData] = useState<ProductsResponse>({ data: [] });
    // const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
     const { id } = useParams<{ id: string }>();
  
    useEffect(() => {
      axios
        .get<ProductsResponse>(`http://localhost:1337/api/products/${id}?populate=categories,image`)
        .then((response) => {
          setData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, [id]);
  
    if (loading) return <div><SkeletonDemoDetails /></div>;

    if (!data) return <p>Product not found</p>;

  const { attributes } = data;
    
  return (
    <>
        <Link to='/Products'>
        <Button  className="px-10 py-6 w-fit text-xl">
              Back 
            </Button> 
            </Link>

<section className="flex items-center justify-between m-10">
    <div></div>
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle>{attributes.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="h-auto flex items-center justify-center">
                <img
                  width={'200px'}
                  height={'auto'}
                  src={`http://localhost:1337${attributes.image.data.attributes.url}`}
                  alt={attributes.title}
                />
              </div>
              <CardTitle className="py-3">Prix : $ {attributes.price}</CardTitle>
              <CardDescription className="py-3">
                
                Stock: {attributes.stock}
                <br />
                Rate: {attributes.rate}
                <br />
              </CardDescription>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="px-10 py-6 w-full text-xl">
           Add To Cart
          </Button>
        </CardFooter>
      </Card>
      <div></div>
    </section>


{/* <section className="h-auto grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6 m-10">
      {data.data.map((i) => (
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
                    src={`http://localhost:1337${i.attributes.image.data.attributes.url}`}
                    alt={i.attributes.title}
                  />
                </div>
                <CardTitle className="py-3">Prix : $ {i.attributes.price}</CardTitle>
                <CardDescription className="py-3">
                  {i.attributes.des}
                  <br />
                  Stock: {i.attributes.stock}
                  <br />
                  Rate: {i.attributes.rate}
                  <br />
                </CardDescription>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="px-10 py-6 w-full text-xl hover:bg-red-400">
              Detail
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section> */}
      
    </>
  )
}

export default ProductDetails
