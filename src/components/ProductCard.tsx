import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

interface ProductAttributes {
    title: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    price: number;
    stock: number;
    rate: number;
    des: string;
  }
  
  interface ProductCardProps {
    id: string | number; // Adjust based on the type of your id
    attributes: ProductAttributes;
  }


const ProductCard: React.FC<ProductCardProps> = ({id,attributes}) => {
  return (
    <>
    <Card  className="w-[350px]">
          <CardHeader>
            <CardTitle>{attributes.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardContent>
              <CardContent className="grid w-full items-center gap-4">
                <CardContent className="h-auto flex items-center justify-center">
                  <img
                    width={'200px'}
                    height={'auto'}
                    src={`${import.meta.env.VITE_SERVER_URL}${attributes.image.data.attributes.url}`}
                    alt={attributes.title}
                  />
                </CardContent>
                <CardTitle className="py-3">Prix : $ {attributes.price}</CardTitle>

                <CardDescription className="py-3 flex items-center justify-between">
                  <CardTitle>Stock: {attributes.stock}</CardTitle>
                  
                  <CardTitle>Rate: {attributes.rate}</CardTitle>
                  
                </CardDescription>

                <CardDescription className="py-3">
                  {attributes.des}
                </CardDescription>

              </CardContent>
            </CardContent>
          </CardContent>
          <CardFooter>
            
            <Link className="w-full"
            to={`/Products/${id}`}>
                 <Button 
                 className="px-10 py-6 w-full text-xl hover:bg-red-400">
              Detail
            </Button> 
            </Link>
            
          </CardFooter>
        </Card>
    </>
  )
}

export default ProductCard