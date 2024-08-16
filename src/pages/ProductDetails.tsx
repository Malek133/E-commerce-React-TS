

 import { addToCart } from "@/app/feauture/CartSlice";
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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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
  
  interface ProductsPageProps {
    attributes?: ProductAttributes;
  }

const ProductDetails: React.FC<ProductsPageProps> = () => {

  const dispatch = useDispatch()

     const { id } = useParams<{ id:string }>();

     const getProductList = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/products/${id}?populate=image&fields=price&fields=title`
      );
      return data;
    };

    const { isLoading, data,error } = useQuery(
     
         {
       queryKey: ["products", id],
       queryFn: getProductList,
     }
    
  );

    useEffect(() => {
      
        document.title = `Product store | Product ${id} Page`;
      
    }, []);

    if (isLoading)
      return (
        
          <SkeletonDemoDetails />
        
      );
      if (error) return <div>Erreur de chargement des données</div>;

  const product = data?.data;
  const attributes = product?.attributes;

  if (!attributes) return <div>Produit non trouvé</div>;
  
  // const { attributes } = data;


  const AddToCartHandler = () =>{
    
     dispatch(addToCart(data.data))
  }
 
  return (
    <>
        <Link to='/Products'>
        <Button  className="px-10 py-6 w-fit text-xl">
              Back 
            </Button> 
            </Link>

<section className="flex items-center justify-between m-10">
    {/* <div></div> */}
    <CardContent></CardContent>
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
                  src={`${import.meta.env.VITE_SERVER_URL}${attributes.image.data.attributes.url}`}
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
          <Button 
          onClick={AddToCartHandler}
          className="px-10 py-6 w-full text-xl">
           Add To Cart
          </Button>
        </CardFooter>
      </Card>
      <div></div>
    </section>
      
    </>
  )
}

export default ProductDetails



          