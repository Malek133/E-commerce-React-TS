

import './App.css'

import {Routes , Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import AboutePage from './pages/AboutePage';
import ProductsPage from './pages/ProductsPage';
//  import LogInPage from './pages/LogInPage';
import StatPage from './components/StatPage';
import DashboardLyaout from './pages/dashboard/DashboardLyaout';
import DashboardProducts from './pages/dashboard/DashboardProducts';
import AdminDashboard from './pages/dashboard';
import ProductDetails from './pages/ProductDetails';
import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  
  

  return (
    <>
    
    <Nav />
      <section className='my-10'>
        <Routes>
     
       

             <Route element={<ProtectedRoute><DashboardLyaout /></ProtectedRoute>} 
             path="/Dashboard">
               <Route index element={< DashboardProducts />} />
               <Route path="products" element={<AdminDashboard />} />
               <Route path="Explore" element={<h5>Explore test</h5>} />
               <Route path="Categories" element={<h5>Categories test</h5>} />
               <Route path="Settings" element={<h5>Settings test</h5>} />
              </Route> 

           

           
               <Route path='/' element={<HomePage />} />
               <Route path='/Products' element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
               <Route path="/Products/:id" element={<ProductDetails />} />
               <Route path='/Stat' element={<StatPage />} />
               <Route path='/Aboute' element={<AboutePage />} />
           
    


     {/* <Route path='/Login' element={<LogInPage   />} />  */}
      </Routes>
      </section>
      
  

     
    </>
  )
}

export default App
