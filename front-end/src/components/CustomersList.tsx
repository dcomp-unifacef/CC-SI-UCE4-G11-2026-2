import type { Customer } from '../types/Customer'

type CustomersListProps = {
  list?: Customer[]
}

export function CustomersList({ list = [] }: CustomersListProps) {
  return (
    <p className="text-secondary">
      Total de clientes: {list.length}
    </p>
  )
}