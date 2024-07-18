import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const ProductsPage = () => {
  return (
    <section className="h-auto 
    grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6 m-10">

   
    <Card className="w-[350px] ">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          
            <div className="h-auto flex items-center justify-center">
              <img width={'200px'} height={'auto'}
              src="https://i.pinimg.com/564x/9f/53/07/9f530796791ac6bcd56078e8d8ee8615.jpg" alt="" />
            </div>
            <CardTitle className="py-3">Prix : $ 774</CardTitle>
            
            
        <CardDescription className="py-3">Deploy your new project in one-click.<br />
        Deploy your new project in one-click.
        Deploy your new project in one-click.<br />
        Deploy your new project in one-click.<br />
        </CardDescription>
      
          
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="px-10 py-6 w-full text-xl">Detail</Button>
      </CardFooter>
    </Card> 

    <Card className="w-[350px] ">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          
            <div className="h-auto flex items-center justify-center">
              <img width={'200px'} height={'auto'}
              src="https://i.pinimg.com/564x/9f/53/07/9f530796791ac6bcd56078e8d8ee8615.jpg" alt="" />
            </div>
            <CardTitle className="py-3">Prix : $ 774</CardTitle>
            
            
        <CardDescription className="py-3">Deploy your new project in one-click.<br />
        Deploy your new project in one-click.
        Deploy your new project in one-click.<br />
        Deploy your new project in one-click.<br />
        </CardDescription>
      
          
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="px-10 py-6 w-full text-xl">Detail</Button>
      </CardFooter>
    </Card> 

    <Card className="w-[350px] ">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          
            <div className="h-auto flex items-center justify-center">
              <img width={'200px'} height={'auto'}
              src="https://i.pinimg.com/564x/9f/53/07/9f530796791ac6bcd56078e8d8ee8615.jpg" alt="" />
            </div>
            <CardTitle className="py-3">Prix : $ 774</CardTitle>
            
            
        <CardDescription className="py-3">Deploy your new project in one-click.<br />
        Deploy your new project in one-click.
        Deploy your new project in one-click.<br />
        Deploy your new project in one-click.<br />
        </CardDescription>
      
          
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="px-10 py-6 w-full text-xl">Detail</Button>
      </CardFooter>
    </Card> 

    <Card className="w-[350px] ">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          
            <div className="h-auto flex items-center justify-center">
              <img width={'200px'} height={'auto'}
              src="https://i.pinimg.com/564x/9f/53/07/9f530796791ac6bcd56078e8d8ee8615.jpg" alt="" />
            </div>
            <CardTitle className="py-3">Prix : $ 774</CardTitle>
            
            
        <CardDescription className="py-3">Deploy your new project in one-click.<br />
        Deploy your new project in one-click.
        Deploy your new project in one-click.<br />
        Deploy your new project in one-click.<br />
        </CardDescription>
      
          
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="px-10 py-6 w-full text-xl">Detail</Button>
      </CardFooter>
    </Card> 

    </section>
  )
}


export default ProductsPage