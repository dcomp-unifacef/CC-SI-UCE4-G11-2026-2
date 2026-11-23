
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import type { Customer } from '../types/Customer'

const API_BASE = import.meta.env.VITE_API_BASE
const API_URL = `${API_BASE}/processes`

const formDefaults = {
  customer_id: '',
  numero_processo: '',
  data_inicio: '',
  numero_vara: '',
  marca_veiculo: '',
  modelo_veiculo: '',
  cor_veiculo: '',
  placa_veiculo: '',
  ano_veiculo: '',
  chance_recebimento: '',
  situacao_atual: 'aberto',
  possui_acao_ativa: '',
  resumo_caso: '',
  observacoes: '',
}

async function getErrorMessage(response: Response) {
  const error = await response.json().catch(() => null)
  return error?.message || `A requisição falhou (HTTP ${response.status}).`
}

export function ProcessForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'

  const [process, setProcess] = useState({ ...formDefaults })
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [loadFailed, setLoadFailed] = useState(false)
  const [formModified, setFormModified] = useState(false)

  async function loadData(active: boolean) {
    setLoading(true)
    setLoadFailed(false)
    setFormModified(false)
    setProcess({ ...formDefaults })

    try {
      // Busca os consorciados para preencher o campo de seleção.
      const customersResponse = await fetch(`${API_BASE}/customers`)

      if (!customersResponse.ok) {
        throw new Error(await getErrorMessage(customersResponse))
      }

      const customersResult: Customer[] = await customersResponse.json()

      if (active) {
        setCustomers(customersResult)
      }

      // Se for um novo processo, não precisa buscar dados de edição.
      if (isNew) return

      const response = await fetch(`${API_URL}/${id}`)

      if (!response.ok) {
        throw new Error(await getErrorMessage(response))
      }

      const result = await response.json()

      if (active) {
        setProcess({
          customer_id: result.customer_id?.toString() ?? '',
          numero_processo: result.numero_processo ?? '',
          data_inicio: result.data_inicio?.slice(0, 10) ?? '',
          numero_vara: result.numero_vara?.toString() ?? '',
          marca_veiculo: result.marca_veiculo ?? '',
          modelo_veiculo: result.modelo_veiculo ?? '',
          cor_veiculo: result.cor_veiculo ?? '',
          placa_veiculo: result.placa_veiculo ?? '',
          ano_veiculo: result.ano_veiculo?.toString() ?? '',
          chance_recebimento: result.chance_recebimento ?? '',
          situacao_atual: result.situacao_atual ?? 'aberto',
          possui_acao_ativa:
            result.possui_acao_ativa === true
              ? 'sim'
              : result.possui_acao_ativa === false
                ? 'nao'
                : result.possui_acao_ativa ?? '',
          resumo_caso: result.resumo_caso ?? '',
          observacoes: result.observacoes ?? '',
        })
      }
    } catch (error) {
      if (active) {
        setLoadFailed(true)
        const message =
          error instanceof Error ? error.message : 'Erro desconhecido.'

        window.alert(`Não foi possível carregar os dados. ${message}`)
      }
    } finally {
      if (active) setLoading(false)
    }
  }

  useEffect(() => {
    let active = true

    loadData(active)

    return () => {
      active = false
    }
  }, [id, isNew])

  function handleFieldChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target

    setProcess(previous => ({
      ...previous,
      [name]: value,
    }))

    setFormModified(true)
  }

  async function handleFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (loading || loadFailed) return

    setLoading(true)

    try {
      const payload = {
        ...process,
        customer_id: process.customer_id
          ? Number(process.customer_id)
          : null,
        data_inicio: process.data_inicio
          ? `${process.data_inicio}T00:00:00.000Z`
          : null,
        numero_vara: process.numero_vara
          ? Number(process.numero_vara)
          : null,
        ano_veiculo: process.ano_veiculo
          ? Number(process.ano_veiculo)
          : null,
        possui_acao_ativa: process.possui_acao_ativa === 'sim',
      }

      // POST para cadastrar e PUT para atualizar.
      const method = isNew ? 'POST' : 'PUT'

      const uri = isNew ? API_URL : `${API_URL}/${id}`

      const response = await fetch(uri, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(await getErrorMessage(response))
      }

      setFormModified(false)
      window.alert('Processo salvo com sucesso.')
      navigate('/process')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido.'

      window.alert(`Não foi possível salvar o processo. ${message}`)
    } finally {
      setLoading(false)
    }
  }

  function handleBackButtonClick() {
    if (
      formModified &&
      !window.confirm(
        'Há informações não salvas. Deseja realmente sair?'
      )
    ) {
      return
    }

    navigate('/process')
  }

  return (
    <section className="container py-4">
      <h1 className="mb-4">
        {isNew ? 'Cadastrar novo processo' : `Editar processo ${id}`}
      </h1>

      {loading && (
        <p role="status">Aguarde, processando...</p>
      )}

      {loadFailed && (
        <div className="alert alert-danger" role="alert">
          Não foi possível carregar os dados. Volte à listagem e tente novamente.
        </div>
      )}

      <form onSubmit={handleFormSubmit}>
        <fieldset disabled={loading || loadFailed}>
          <legend className="visually-hidden">
            Dados do processo
          </legend>

          <div className="row g-3">

            <div className="col-12">
              <label htmlFor="customer_id" className="form-label">
                ID Consorciado
              </label>

              <select
                id="customer_id"
                name="customer_id"
                className="form-select"
                required
                value={process.customer_id}
                onChange={handleFieldChange}
              >
                <option value="">Selecione o consorciado...</option>

                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.id} - {customer.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="numero_processo" className="form-label">
                Número do processo
              </label>
              <input
                id="numero_processo"
                name="numero_processo"
                type="text"
                className="form-control"
                required
                autoFocus
                value={process.numero_processo}
                onChange={handleFieldChange}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="data_inicio" className="form-label">
                Data de início
              </label>
              <input
                id="data_inicio"
                name="data_inicio"
                type="date"
                className="form-control"
                required
                value={process.data_inicio}
                onChange={handleFieldChange}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="numero_vara" className="form-label">
                Número da vara
              </label>
              <input
                id="numero_vara"
                name="numero_vara"
                type="number"
                className="form-control"
                value={process.numero_vara}
                onChange={handleFieldChange}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="marca_veiculo" className="form-label">
                Marca do veículo
              </label>
              <input
                id="marca_veiculo"
                name="marca_veiculo"
                type="text"
                className="form-control"
                value={process.marca_veiculo}
                onChange={handleFieldChange}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="modelo_veiculo" className="form-label">
                Modelo do veículo
              </label>
              <input
                id="modelo_veiculo"
                name="modelo_veiculo"
                type="text"
                className="form-control"
                value={process.modelo_veiculo}
                onChange={handleFieldChange}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="cor_veiculo" className="form-label">
                Cor do veículo
              </label>
              <input
                id="cor_veiculo"
                name="cor_veiculo"
                type="text"
                className="form-control"
                value={process.cor_veiculo}
                onChange={handleFieldChange}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="placa_veiculo" className="form-label">
                Placa do veículo
              </label>
              <input
                id="placa_veiculo"
                name="placa_veiculo"
                type="text"
                className="form-control"
                value={process.placa_veiculo}
                onChange={handleFieldChange}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="ano_veiculo" className="form-label">
                Ano do veículo
              </label>
              <input
                id="ano_veiculo"
                name="ano_veiculo"
                type="number"
                className="form-control"
                value={process.ano_veiculo}
                onChange={handleFieldChange}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="chance_recebimento" className="form-label">
                Chance de recebimento
              </label>
              <select
                id="chance_recebimento"
                name="chance_recebimento"
                className="form-select"
                required
                value={process.chance_recebimento}
                onChange={handleFieldChange}
              >
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="situacao_atual" className="form-label">
                Situação atual
              </label>
              <select
                id="situacao_atual"
                name="situacao_atual"
                className="form-select"
                required
                value={process.situacao_atual}
                onChange={handleFieldChange}
              >
                <option value="aberto">Aberto</option>
                <option value="pendente">Pendente</option>
                <option value="resolvido">Resolvido</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="possui_acao_ativa" className="form-label">
                Possui ação ativa?
              </label>
              <select
                id="possui_acao_ativa"
                name="possui_acao_ativa"
                className="form-select"
                required
                value={process.possui_acao_ativa}
                onChange={handleFieldChange}
              >
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>

            <div className="col-12">
              <label htmlFor="resumo_caso" className="form-label">
                Resumo do caso
              </label>
              <textarea
                id="resumo_caso"
                name="resumo_caso"
                className="form-control"
                rows={4}
                value={process.resumo_caso}
                onChange={handleFieldChange}
              />
            </div>

            <div className="col-12">
              <label htmlFor="observacoes" className="form-label">
                Observações
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                className="form-control"
                rows={4}
                value={process.observacoes}
                onChange={handleFieldChange}
              />
            </div>

          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Salvar
          </button>
        </fieldset>

        <button
          type="button"
          className="btn btn-outline-secondary mt-3"
          disabled={loading}
          onClick={handleBackButtonClick}
        >
          Voltar
        </button>
      </form>
    </section>
  )
}