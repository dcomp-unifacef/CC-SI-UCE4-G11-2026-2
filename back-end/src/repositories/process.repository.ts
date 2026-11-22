import { prisma } from '../database/client.ts'
import type { CreateProcessDTO, UpdateProcessDTO } from '../dtos/process.dto.ts'

export const processRepository = {
  create(data: CreateProcessDTO) {
    return prisma.process.create({ data })
  },

  findAll() {
    return prisma.process.findMany({
      orderBy: { id: 'asc' },
      include: { customer: true },
    })
  },

  findById(id: number) {
    return prisma.process.findUnique({
      where: { id },
      include: { customer: true },
    })
  },

  update(id: number, data: UpdateProcessDTO) {
    return prisma.process.update({ where: { id }, data })
  },

  delete(id: number) {
    return prisma.process.delete({ where: { id } })
  },
}
}