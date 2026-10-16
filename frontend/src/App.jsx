import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Propiedades from './pages/Propiedades'
import Detalle from './pages/Detalle'
import Tasaciones from './pages/Tasaciones'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'

function ScrollArriba() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollArriba />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/propiedades" element={<Propiedades />} />
          <Route path="/propiedad/:id" element={<Detalle />} />
          <Route path="/tasaciones" element={<Tasaciones />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<div className="container section"><h2>Página no encontrada</h2></div>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
//////