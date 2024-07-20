
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { Link} from 'react-router-dom';
import { SheetCard } from './SheatCard';

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
            <ul className='flex items-center justify-center gap-10 text-xl font-medium'>

                <li><Link to="/Dashboard">Dashboard</Link></li>

                <li><Link to={'/Products'}>Products</Link></li>

                <li><Link to={'/Aboute'}>Aboute</Link></li>

                <li><Link to={'/Stat'}>Stat</Link></li>

            </ul>
        </div>
        <div className="flex justify-center items-center space-x-5">
         <Button className='hover:bg-red-400'>
          <Link to='/Login'>LogIn</Link>
             </Button>
            <ModeToggle />
            <SheetCard />
          </div>
          
      </div>
    </>
  )
}

export default Nav
