import { Buffer } from "buffer"
import express from "express"
import fs from "fs"
import path from "path"

const app = express()
const PORT = process.env.PORT || 3000

const randomImageDir = path.join("/", "usr", "src", "app", "files")
const randomImagePath = path.join(
  "/",
  "usr",
  "src",
  "app",
  "files",
  "random_image.jpg"
)
console.log(fs.existsSync(randomImageDir))

app.use("/images", express.static(randomImageDir))
app.use(express.urlencoded())

const fetchTodos = async () => {
  const response = await fetch("http://todo-backend-svc:5678/todos", {
    method: "GET",
  })
  const todos = Object.values(await response.json())
  console.log(todos)
  const liElements = []
  for (const todo of todos) {
    liElements.push(`<li>${todo}</li>`)
  }
  console.log(liElements)
  return liElements.join("")
}

const createNewTodo = async (newTodo) => {
  const response = await fetch("http://todo-backend-svc:5678/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
}

const downloadRandomImage = async () => {
  try {
    const response = await fetch("https://picsum.photos/1200")
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    fs.writeFileSync(randomImagePath, buffer, (err) => console.log(err))
    console.log("Downloaded new random image")
  } catch (error) {
    throw error
  }
  setTimeout(downloadRandomImage, 10 * 60000)
}

app.post("/newtodo", (req, res) => {
  createNewTodo(req.body)
    .then(console.log("New todo saved"))
    .catch((error) => console.log(error))
    .finally(() => {
      fetchTodos()
      res.redirect("/")
    })
})

app.get("/", async (req, res) => {
  if (!fs.existsSync(randomImagePath)) {
    try {
      await downloadRandomImage()
    } catch (error) {
      console.log(error)
    }
  }

  res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>The Project App</title>
        </head>
        <body>
            <h1>The Project App</h1>
            <h2>DevOps with Kubernetes 2025</h2>
            <img src="/images/random_image.jpg">
            <form action="/newtodo" method="post">
                <label for="new-todo-name">New todo:</label><br>
                <input type="text" id="new-todo-name" name="new-todo-name" maxlength="140"><br>
                <input type="submit" id="submit-todo-button" value="Submit">
            </form> 
            <ul>
                ${await fetchTodos()}
        </body>
        </html>
    `)
})
try {
  await downloadRandomImage()
  await fetchTodos()
} catch (error) {
  console.log(error)
}

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
