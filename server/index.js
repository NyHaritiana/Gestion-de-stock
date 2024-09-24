import express from "express"
import users from "./user.js"
import cors from "cors"

const app = express()
const port = 3000

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is ready')
})

app.get("/user", (req, res) => {
  res.send(users);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})