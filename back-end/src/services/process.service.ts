import { prisma } from '../database/client.ts'
import { processRepository } from '../repositories/process.repository.ts'

export const processService = {
  async create(body: any) {
    const customer = await prisma.customer.findUnique({
      where: { id: body.customer_id },
    })

    if (!customer) {
      throw new Error('CUSTOMER_NOT_FOUND')
    }

    return processRepository.create({
      ...body,
      start_date: new Date(body.start_date),
    })
  },

  list() {
    return processRepository.findAll()
  },

  getById(id: number) {
    return processRepository.findById(id)
  },

  update(id: number, body: any) {
    const data = { ...body }

    if (body.start_date) {
      data.start_date = new Date(body.start_date)
    }

    return processRepository.update(id, data)
  },

  remove(id: number) {
    return processRepository.delete(id)
  },
}