import express from "express"
import fs from "fs"
import path from "path"

const app = express()
const PORT = process.env.PORT
const filepath = path.join(
  "/",
  "usr",
  "src",
  "app",
  "files",
  "randomstring.txt"
)

const getFile = () => {
  if (!fs.existsSync(filepath)) {
    return "File with random string not found!"
  }
  return fs.readFileSync(filepath)
}

app.get("/status", (req, res) => {
  res.setHeader("content-type", "text/plain")
  res.send(getFile())
})

app.listen(PORT)
