import { Router } from 'express'
import type { Document, Model } from 'mongoose'

export function createResourceRouter(model: Model<Document>) {
  const router = Router()

  router.get('/', async (_request, response, next) => {
    try {
      response.json(await model.find().lean())
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (request, response, next) => {
    try {
      response.status(201).json(await model.create(request.body))
    } catch (error) {
      next(error)
    }
  })

  return router
}