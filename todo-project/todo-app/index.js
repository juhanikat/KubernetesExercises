import { Buffer } from "buffer"
import express from "express"
import fs from "fs"
import path from "path"

const PORT = process.env.PORT
const RANDOM_IMAGE_MOUNTPATH = process.env.RANDOM_IMAGE_MOUNTPATH
const RANDOM_IMAGE_FILENAME = process.env.RANDOM_IMAGE_FILENAME
const PICSUM_URL = process.env.PICSUM_URL
const TODO_BACKEND_URL = process.env.TODO_BACKEND_URL

const randomImagePath = path.join(RANDOM_IMAGE_MOUNTPATH, RANDOM_IMAGE_FILENAME)

const app = express()
app.use("/images", express.static(RANDOM_IMAGE_MOUNTPATH))
app.use(express.urlencoded())
console.log(randomImagePath)

const fetchTodos = async () => {
  const response = await fetch(TODO_BACKEND_URL, {
    method: "GET",
  })
  const todos = Object.values(await response.json())
  const liElements = []
  for (const todo of todos) {
    liElements.push(`<li>${todo}</li>`)
  }
  return liElements.join("")
}

const createNewTodo = async (newTodo) => {
  await fetch(TODO_BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
}

const downloadRandomImage = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(PICSUM_URL)
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
      res.redirect("/home")
    })
})

app.get("/home", async (req, res) => {
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
            <img src="/images/${RANDOM_IMAGE_FILENAME}">
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

app.get("/", (req, res) => {
  res.send("'/' works!")
})

try {
  await fetchTodos()
} catch (error) {
  console.log(error)
}

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
