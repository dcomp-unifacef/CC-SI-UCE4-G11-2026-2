import type { Request, Response } from 'express'
import { processService } from '../services/process.service.ts'

export const processController = {
  async create(req: Request, res: Response) {
    try {
      const process = await processService.create(req.body)
      res.status(201).json(process)
    } catch (error: any) {
      if (error.message === 'CUSTOMER_NOT_FOUND') {
        return res.status(400).json({ message: 'Consorciado não encontrado' })
      }
      console.error(error)
      res.status(500).json({ message: 'Erro ao criar processo' })
    }
  },

  async list(_req: Request, res: Response) {
    try {
      const processes = await processService.list()
      res.json(processes)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao listar processos' })
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const process = await processService.getById(Number(req.params.id))
      if (!process) {
        return res.status(404).json({ message: 'Processo não encontrado' })
      }
      res.json(process)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao buscar processo' })
    }
  },

  async update(req: Request, res: Response) {
    try {
      const process = await processService.update(Number(req.params.id), req.body)
      res.json(process)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao atualizar processo' })
    }
  },

  async remove(req: Request, res: Response) {
    try {
      await processService.remove(Number(req.params.id))
      res.status(204).send()
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao excluir processo' })
    }
  },
}