import { useState } from 'react'
import {Button} from "./components/ui/button"
import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Layout from "./components/layout" 
import { ThemeProvider } from './context/theme-provider'
import WeatherDashboard from './pages/weather-dashboard'
import CityPage from './pages/city-page'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()
function App() {
  const [count, setCount] = useState(0)
 
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <ThemeProvider defaultTheme='dark'>
    <Layout>
      <Routes>
        <Route path='/' element={<WeatherDashboard/>}/>
        <Route path='/city/:cityName' element={<CityPage/>}/>
      </Routes>
    </Layout>
    </ThemeProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
