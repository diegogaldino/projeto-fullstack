import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

const app = express()
dotenv.config()

app.use(cors({ origin: '*' }))
app.use(express.json())

const { PORT = 3003 } = process.env
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
export default app