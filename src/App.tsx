

import './App.css'
import Nav from "./components/Nav";
import {Routes , Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import BlogPage from './components/BlogPage';
import AboutePage from './pages/AboutePage';
import ProductsPage from './pages/ProductsPage';
import LogInPage from './pages/LogInPage';

function App() {
  

  return (
    <>
    
      <Nav />
      <section className='my-10'>
        <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path='/Dashboard' element={<DashboardPage />} />
     <Route path='/Products' element={<ProductsPage />} />
     <Route path='/Blog' element={<BlogPage />} />
     <Route path='/Aboute' element={<AboutePage />} />
     <Route path='/Login' element={<LogInPage />} />
      </Routes>
      </section>
      
  

     
    </>
  )
}

export default App
