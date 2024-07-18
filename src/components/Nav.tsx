
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'

const Nav = () => {
  return (
    <>
    <div className="flex items-center justify-between">
        <div className='text-4xl font-semibold'>
            My App
        </div>
        <div>
            <ul className='flex items-center justify-center gap-10 text-xl font-medium'>
                <li>Dashboard</li>
                <li>Products</li>
                <li>Aboute</li>
                <li>Blog</li>
            </ul>
        </div>
        <div className="flex justify-center items-center space-x-5">
         <Button>
          LogIn
             </Button>
            <ModeToggle />
          </div>
          
      </div>
    </>
  )
}

export default Nav
