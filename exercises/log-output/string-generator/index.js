import express from "express"
import fs from "fs"
import path from "path"

const app = express()
const PORT = process.env.PORT
const MESSAGE = process.env.MESSAGE

const pingpongAmountPath = path.join(
  "/",
  "usr",
  "src",
  "app",
  "files",
  "pingpongpamount.txt"
)

const randomStringPath = path.join(
  "/",
  "usr",
  "src",
  "app",
  "files",
  "randomstring.txt"
)
const informationFilePath = path.join(
  "/",
  "usr",
  "src",
  "app",
  "config",
  "information.txt"
)

let randomString = ""
for (let i = 0; i < 10; i++) {
  randomString = randomString + Math.floor(Math.random() * 10)
}

const readInformationFile = () => {
  if (!fs.existsSync(informationFilePath)) {
    return "information.txt not found! ConfigMap volume might not be mounted."
  }
  const text = fs.readFileSync(informationFilePath, { encoding: "utf-8" })
  return text
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
  return `
  file content: ${readInformationFile()}
  env variable: MESSAGE=${MESSAGE}
  ${new Date()}:${randomString}
  Ping / Pongs: ${pingpongAmount}`
}

const writeString = async () => {
  fs.writeFileSync(randomStringPath, await getString(), (err) => {
    if (err) console.log(err)
  })
  setTimeout(writeString, 5000)
}

app.listen(PORT)

writeString()
