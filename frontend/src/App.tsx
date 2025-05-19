import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signin } from './pages/Signin'
import { Menu } from './pages/MenuPage'
import { Signup } from './pages/Signup'
import { CartPage } from './pages/CartPage'
import { Billing } from './pages/Billing'
import { HistoryPage } from './pages/HistoryPage'
import { AdminDash } from './pages/AdminDashboard'
import { RoomsDetails } from './pages/RoomDetails'
import { MenuDetails } from './pages/MenuDetails'
import { RoomService } from './pages/RoomService'


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
          <Route path='/admindash' element={<AdminDash />} />
          <Route path='/admin/rooms' element={<RoomsDetails />} />
          <Route path='/admin/menu' element={<MenuDetails />} />
          <Route path='/service' element={<RoomService />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
