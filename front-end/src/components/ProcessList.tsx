
import { useState, useEffect } from 'react'
import { Link } from 'react-router'

type Process = {
  id: number
  customer_id: number
  process_number: string
  start_date: string
  court_number: string
  car_brand: string
  car_model: string
  current_status: string
}

export function CarsList() {
  const [processes, setProcesses] = useState<Process[]>([])

  async function fetchData() {
    const apiHost = import.meta.env.VITE_API_BASE

    try {
      const response = await fetch(`${apiHost}/processes`)

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`)
      }

      const data: Process[] = await response.json()
      setProcesses(data)

    } catch (error) {
      if (error instanceof Error) {
        window.alert('ERRO: ' + error.message)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h2 className="h2 mb-3">Listagem de Processos</h2>

      <p className="text-secondary">
        Total de processos: {processes.length}
      </p>

      <div className="text-end mb-3">
        <Link to="/process/new" className="btn btn-outline-primary">
          Novo processo
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Código</th>
              <th>ID Consorciado</th>
              <th>Nº Processo</th>
              <th>Data de início</th>
              <th>Nº Vara</th>
              <th>Veículo</th>
              <th>Situação</th>
              <th className="text-end">Ações</th>
            </tr>
          </thead>

          <tbody>
            {processes.map((list) => (
              <tr key={list.id}>
                <td>{list.id}</td>
                <td>{list.customer_id}</td>
                <td>{list.process_number}</td>
                <td>
                  {new Date(list.start_date).toLocaleDateString('pt-BR')}
                </td>
                <td>{list.court_number}</td>
                <td>{list.car_brand} {list.car_model}</td>
                <td>{list.current_status}</td>
                <td className="text-end">
                  <Link
                    to={`/process/${list.id}`}
                    className="btn btn-outline-primary"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}

            {processes.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-secondary">
                  Nenhum processo cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
