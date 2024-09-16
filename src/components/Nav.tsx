
// import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { Link} from 'react-router-dom';
import { SheetCard } from './SheatCard';
import { SignedIn, SignedOut,
   SignInButton, UserButton
   } from "@clerk/clerk-react";
import { Button } from './ui/button';



const Nav = () => {
  return (
    <>
    <div className="flex items-center justify-between pb-16">
        <div className='text-4xl font-semibold'>
           <Link to='/'>
           My App
           </Link> 
        
            <ul className='flex items-center justify-center gap-10 text-md font-medium'>

                 {/* <li><Link to="/Dashboard">Dashboard</Link></li> */}

                {/* <li><Link to={'/Products'}>Products</Link></li> */}

                {/* <li><Link to={'/Aboute'}>Aboute</Link></li>

                <li><Link to={'/Stat'}>Stat</Link></li> */}

            </ul>
        </div>
        <div className="flex justify-center items-center space-x-5">
         {/* <Button className='hover:bg-red-400'>
          <Link to='/Login'>LogIn</Link>
             </Button> */}
             <div className='flex'>

             
             <Button className='hover:bg-red-400 mx-5'>
                 <Link to={'/Dashboard'}>
                    Admin
                 </Link> 
             </Button>
      

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <div className='flex justify-between items-center gap-10 text-lg font-semibold'>
         <SignedIn>

          <Link to={'/Products'}>
           
              <span className=''>
              Products
                </span>
            
          </Link>

          <Link to={'/Aboute'}>
           
           <span className=''>
           Aboute
             </span>
         
       </Link>

       <Link to={'/Stat'}>
           
           <span className=''>
          Stat
             </span>
         
       </Link>
          
        <UserButton />
         <SheetCard />
      </SignedIn> 
      
      </div>

   
    </div>
   
      
     
            <ModeToggle />
            
          </div>
          
      </div>
    </>
  )
}

export default Nav
