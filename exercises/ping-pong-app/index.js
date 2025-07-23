import express from "express"
import fs from "fs"
import path from "path"

const app = express()
const PORT = process.env.PORT

const amountFileDir = path.join("/", "usr", "src", "app", "files")

const amountFilePath = path.join(
  "/",
  "usr",
  "src",
  "app",
  "files",
  "pingpongpamount.txt"
)

let pings
if (!fs.existsSync(amountFileDir) || !fs.existsSync(amountFilePath)) {
  pings = 0
} else {
  pings = Number(fs.readFileSync(amountFilePath, "utf8"))
}

app.get("/pingpong", async (req, res) => {
  pings = pings + 1
  const message = `pong ${pings}`
  if (fs.existsSync(amountFileDir) && fs.existsSync(amountFilePath)) {
    fs.writeFileSync(amountFilePath, String(counter), (err) => {
      if (err) console.log(err)
    })
  }
  res.send(message)
})

app.get("/pings", (req, res) => {
  console.log(pings)
  res.json({ pings: pings })
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
