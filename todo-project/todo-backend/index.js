import express from "express"
import pg from "pg"

const { Pool } = pg

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
})

const client = await pool.connect()

const tableExists = await client.query(
  "SELECT EXISTS ( SELECT 1 FROM information_schema.tables WHERE table_name = 'todos') AS table_existence;"
)
if (!tableExists.rows[0]["table_existence"]) {
  console.log("Table todos not found, creating it.")
  await client.query("CREATE TABLE todos (id SERIAL PRIMARY KEY, todo TEXT);")
}

let todos = []
const rows = await client.query("SELECT todo FROM todos;").rows
if (rows) todos = Object.values(rows)

client.release()

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.post("/todos", async (req, res) => {
  if (req.body["new-todo-name"]) {
    todos.push(req.body["new-todo-name"])
    await pool.query(
      `INSERT INTO todos (todo) VALUES ('${req.body["new-todo-name"]}');`
    )
    console.log("New todo saved in backend")
    res.status(200).end()
  } else {
    console.log("no new-todo-name in request body!")
    res.status(400).end()
  }
})

app.get("/todos", async (req, res) => {
  res.send(todos)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
