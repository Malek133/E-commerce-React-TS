import { Button } from "@/components/ui/button"
import './App.css'

import { ThemeProvider } from "./components/theme-provider"
import { ModeToggle } from "./components/mode-toggle";




function App() {
  

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex items-center justify-between">
        
        <Button>
          Alphazero
        </Button>
        <ModeToggle />
      </div>
    </ThemeProvider>

     
    </>
  )
}

export default App
