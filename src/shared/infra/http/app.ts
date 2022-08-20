import "express-async-errors"
import { Request, Response, NextFunction } from 'express'
import express from 'express';
import { router } from './routes';
import { AppDataSource } from '../../../data-source';

import "reflect-metadata"
import "../../container"
import { AppError } from '../../errors/AppError';

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  }).catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

const app = express();

app.use(express.json())
app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

export { app }