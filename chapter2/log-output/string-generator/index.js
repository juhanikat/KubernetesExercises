import express from "express"
import fs from "fs"
import path from "path"

const app = express()
const PORT = process.env.PORT

const pingpongAmountPath = path.join(
  "/",
  "usr",
  "src",
  "app",
  "files",
  "pingpongpamount.txt"
)

const randomStringDir = path.join("/", "usr", "src", "app", "files")
const randomStringPath = path.join(
  "/",
  "usr",
  "src",
  "app",
  "files",
  "randomstring.txt"
)

let randomString = ""
for (let i = 0; i < 10; i++) {
  randomString = randomString + Math.floor(Math.random() * 10)
}

const getString = async () => {
  let pingpongAmount = undefined
  try {
    const response = await fetch("http://ping-pong-app-svc:3456/pings")
    const json = await response.json()
    pingpongAmount = Number(json.pings)
  } catch (error) {
    console.log(error)
    pingpongAmount = "???"
  }
  return `${new Date()}:${randomString}\nPing / Pongs: ${pingpongAmount}`
}

const writeString = async () => {
  fs.writeFileSync(randomStringPath, await getString(), (err) => {
    if (err) console.log(err)
  })
  setTimeout(writeString, 5000)
}

app.listen(PORT)

writeString()
