import { FC } from 'react';
import { CardContent, CardTitle } from "@/components/ui/card";
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/app/feauture/CartSlice';


interface CarteDrawerItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  attributes?: any; // Make it optional or define the exact type
}



// interface CarteDrawerItemProps {
//   id: string;
//   attributes: {
//     image: {
//       data: {
//         attributes: {
//           url: string;
//         };
//       };
//     };
//     price: number;
//     title: string;
//   };
//   quantity: number;
// }

const CarteDrawerItem:FC<CarteDrawerItemProps> =({ id, attributes: { image, price, title }, quantity }) => {
     const dispatch = useDispatch();
    return (
    <>
        <CardContent
            className="flex justify-between items-center mb-3 py-4 gap-8">

            <img
                src={`${import.meta.env.VITE_SERVER_URL}${image.data.attributes.url}`}
                alt={title}
                width={66}
                height={66} />

            <div>
                <CardTitle className='text-sm font-semibold'>{title}</CardTitle>
                <CardTitle className='text-sm'>${price}</CardTitle>
                <CardTitle className='text-sm'>Quantity: {quantity}</CardTitle>
            </div>

            <Button
                variant="ghost"
                    onClick={() => dispatch(removeFromCart(id))}
                className="text-red-600"
            >
                <X />
            </Button>

        </CardContent>
    </>
    );
}

export default CarteDrawerItem;
