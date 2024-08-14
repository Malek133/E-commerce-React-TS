import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// import { store } from './app/store.ts'
// import {Provider} from 'react-redux'
import { ClerkProvider } from '@clerk/clerk-react'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <Provider store={store} >
  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
        </ClerkProvider>
        
      </Router>
      
    </ThemeProvider>
    
  </React.StrictMode>
  </QueryClientProvider>
  ,
)
