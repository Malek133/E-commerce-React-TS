
// import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { Link} from 'react-router-dom';
import { SheetCard } from './SheatCard';
import { SignedIn, SignedOut,
   SignInButton, UserButton
   } from "@clerk/clerk-react";


const Nav = () => {
  return (
    <>
    <div className="flex items-center justify-between pb-16">
        <div className='text-4xl font-semibold'>
           <Link to='/'>
           My App
           </Link> 
        </div>
        <div>
            <ul className='flex items-center justify-center gap-10 text-md font-medium'>

                 {/* <li><Link to="/Dashboard">Dashboard</Link></li> */}

                {/* <li><Link to={'/Products'}>Products</Link></li> */}

                <li><Link to={'/Aboute'}>Aboute</Link></li>

                <li><Link to={'/Stat'}>Stat</Link></li>

            </ul>
        </div>
        <div className="flex justify-center items-center space-x-5">
         {/* <Button className='hover:bg-red-400'>
          <Link to='/Login'>LogIn</Link>
             </Button> */}
             <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <div className='flex justify-between items-center gap-5 font-semibold'>
         <SignedIn>

      <Link to={'/Dashboard'}>
           
              <span className='md:block hidden'>
              Dashboard
                </span>
           
          </Link>

          <Link to={'/Products'}>
           
              <span className='md:block hidden'>
              Products
                </span>
            
          </Link>

        <UserButton />
      </SignedIn> 
      </div>
    
    </header>
            <ModeToggle />
            <SheetCard />
          </div>
          
      </div>
    </>
  )
}

export default Nav
