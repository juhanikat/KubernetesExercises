import express from "express"

const app = express()
const PORT = process.env.PORT

app.use(express.json())

let todos = []

app.post("/todos", (req, res) => {
  if (req.body["new-todo-name"]) {
    todos.push(req.body["new-todo-name"])
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
