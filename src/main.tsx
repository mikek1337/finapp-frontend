import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import {Toaster} from 'sonner';
import { Home } from './routes/Home.tsx';
import { Dashboard } from './routes/Dashboard.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
   
    <Toaster/>
  </StrictMode>,
)
