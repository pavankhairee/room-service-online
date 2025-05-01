import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signin } from './pages/Signin'
import { Menu } from './pages/MenuPage'
import { Signup } from './pages/Signup'
import { CartPage } from './pages/CartPage'
import { Billing } from './pages/Billing'
import { HistoryPage } from './pages/HistoryPage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/menupage" element={<Menu />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/bill" element={<Billing />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
