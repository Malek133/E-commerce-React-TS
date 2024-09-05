import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Compass, House, Settings, Star, TrendingUp } from 'lucide-react';
import { Outlet,
     Link as RouterLink } from 'react-router-dom';

     interface NavItemProps {
        to: string;
        icon: LucideIcon; // ou ajustez le type selon votre besoin
        children: ReactNode;
        rest?: React.HTMLAttributes<HTMLDivElement>; // ou le type approprié selon le type d'élément
      }
     

     const LinkItems = [
        {to:"/Dashboard", name: 'Home', icon: House },
        { to:"/Dashboard/Products",name: 'Products', icon: TrendingUp },
        {to:"/Dashboard/Explore", name: 'Explore', icon: Compass },
        {to:"/Dashboard/Categories", name: 'Categories', icon: Star },
        {to:"/Dashboard/Settings", name: 'Settings', icon: Settings },
      ]

      const SidebarContent = () => {
        return(
           <section>
    {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </section> 
        )
      }

      const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, children, ...rest }) => {
        return (
          <RouterLink
          className='textDecoratio-none'
          
            to={to}
            >
            <section
            className='flex items-center px-20 py-4 mx-4 
            border-r-lg cursor-pointer 
            hover:bg-cyan-600  rounded'
              {...rest}>
              {/* {Icon && ( */}
                <div
                className='mr-4 font-medium
                 group-hover:text-white'
                //   as={icon}
            ></div>
              {/* )} */}
              {children}
            </section>
          </RouterLink>
        )
      }
const DashboardLyaout = (
  // {isAuthenticated}:{isAuthenticated:string | undefined}
) => {
  // if(!isAuthenticated) return <Navigate to="/Login" replace />
  return (
    <section className='h-full flex items-center' >

        <div className='h-screen box py-6  rounded'>
          <SidebarContent 
    //  onClose={() => console.log('close')} 
     />
        </div>
    
     
    <div className='h-auto flex items-center justify-center w-screen rounded mb-10 px-10' >
      
      <Outlet />
    </div>
  </section>
  )
}



export default DashboardLyaout