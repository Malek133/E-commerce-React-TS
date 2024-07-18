
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { Link} from 'react-router-dom';

const Nav = () => {
  return (
    <>
    <div className="flex items-center justify-between">
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
         <Button>
          <Link to='/Login'>LogIn</Link>
             </Button>
            <ModeToggle />
          </div>
          
      </div>
    </>
  )
}

export default Nav
