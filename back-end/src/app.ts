import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import processRoutes from './routes/process.routes.ts'
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import customersRouter from './routes/customers'

import cors from 'cors'

const app = express()

app.use(cors({
 origin: process.env.ALLOWED_ORIGINS.split(','),
}))

app.use(logger('dev'))
app.use('/processes', processRoutes)
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

/***************** ROTAS *************************/

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use('/customers', customersRouter)

export default app
