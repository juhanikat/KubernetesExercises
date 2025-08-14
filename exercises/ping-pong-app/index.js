import express from "express"
import pg from "pg"

const { Pool } = pg

const pool = new Pool({
  user: "postgres-user",
  password: "postgres-password",
  host: "postgres-svc",
  port: undefined,
  database: "postgres",
})

const client = await pool.connect()

const tableExists = await client.query(
  "SELECT EXISTS ( SELECT 1 FROM information_schema.tables WHERE table_name = 'pingpong') AS table_existence;"
)
if (!Boolean(tableExists.rows[0]["table_existence"])) {
  console.log("Table pingpong not found, creating it.")
  await client.query("CREATE TABLE pingpong (id INT, amount INT);")
  await client.query("INSERT INTO pingpong (id, amount) VALUES ('1', '0');")
}

let pings
pings = Number(
  (await client.query("SELECT amount FROM pingpong WHERE id = '1';")).rows[0][
    "amount"
  ]
)

client.release()

const app = express()
const PORT = process.env.PORT

app.get("/", async (req, res) => {
  pings = pings + 1
  const message = `pong ${pings}`
  await pool.query(`UPDATE pingpong SET amount = '${pings}' WHERE id = '1';`)
  res.send(message)
})

app.get("/pings", (req, res) => {
  res.json({ pings: pings })
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
