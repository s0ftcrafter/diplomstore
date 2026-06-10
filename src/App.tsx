import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { AboutPage } from './pages/AboutPage/AboutPage'
import { CartPage } from './pages/CartPage/CartPage'
import { ContactsPage } from './pages/ContactsPage/ContactsPage'
import { HomePage } from './pages/HomePage/HomePage'
import { ProductPage } from './pages/ProductPage/ProductPage'
import { ROUTES } from './router/paths'

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '')

function App() {
  return (
    <BrowserRouter basename={routerBasename || undefined}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.home} replace />} />
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.contacts} element={<ContactsPage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path={ROUTES.cart} element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
