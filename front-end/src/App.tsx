
import { BrowserRouter, NavLink, Routes, Route } from 'react-router'
import { Homepage } from './components/Homepage'
import { CustomersList } from './components/CustomersList'
import { CarsList } from './components/ProcessList'
import { CustomersForm } from './components/CustomerForm'
import { ProcessForm } from './components/ProcessForm'

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
            element={<CustomersList />}
          />

          <Route
            path="/customers/:id"
            element={<CustomersForm />}
          />

          <Route
            path="/process"
            element={<CarsList />}
          />

          <Route
            path="/process/new"
            element={<ProcessForm />}
          />

          <Route
            path="/process/:id"
            element={<ProcessForm />}
          />

        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
