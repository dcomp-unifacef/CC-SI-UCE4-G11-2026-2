
import { BrowserRouter, NavLink, Routes, Route } from 'react-router'
import { Homepage } from './components/Homepage'
import { CustomersList } from './components/CustomersList'
import { CarsList } from './components/ProcessList'

function App() {
  return (
    <BrowserRouter>
      <header className="bg-dark text-white py-3">
        <div className="container">
          <h1 className="h4 mb-0">
            JuriGroscon &bull; sistema jurídico de consórcio
          </h1>
        </div>
      </header>

      <nav className="bg-light border-bottom py-2">
        <div className="container">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>
                Início
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/customers" className="nav-link">
                Clientes
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/process" className="nav-link">
                Processos
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route
            path="/"
            element={<Homepage />}
          />

          <Route
            path="/customers"
            element={
              <>
                <h2 className="h5 mb-3">Clientes</h2>
                <div className="text-secondary">
                  <CustomersList />
                </div>
              </>
            }
          />

          <Route
            path="/process"
            element={<CarsList />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
