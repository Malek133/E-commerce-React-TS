import { Button } from "@/components/ui/button"

import { ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { clearFromCart, selectCart } from "@/app/feauture/CartSlice";
import CarteDrawerItem from "./CarteDrawerItem";
import { CardTitle } from "./ui/card";

export function SheetCard() {
  
    const dispatch = useDispatch()
  

 const {CartProducts} = useSelector(selectCart) 


  return (
    <Sheet>
      <SheetTrigger  asChild>
        <Button  
        variant="default"><ShoppingCart />
        <span className="text-base mx-3"> ({CartProducts.length})</span>
        </Button>
      </SheetTrigger>

     
      <SheetContent className=" flex-col items-center justify-between">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. 
            Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        {
         CartProducts.length ? (
          CartProducts.map(i =>(
          <CarteDrawerItem key={i.id} {...i} /> )) 
          ) : (
          <CardTitle>No Product</CardTitle>)    
        }
        
        <SheetFooter>
          <Button className="bg-red-500 text-white" 
          onClick={()=>{dispatch(clearFromCart())}}
          type="submit">Clear All</Button>
          <SheetClose asChild>
          
            <Button 
            type="submit">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
       
    </Sheet>
  )
}
