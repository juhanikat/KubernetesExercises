import express from "express"
import fs from "fs"
import path from "path"

const app = express()
const PORT = process.env.PORT

const pingpongAmountPath = path.join('/', 'usr', 'src', "app", "files", 'pingpongpamount.txt')
const randomStringPath = path.join('/', 'usr', 'src', 'app', 'files', 'randomstring.txt')

let randomString = ""
for (let i = 0; i < 10; i++) {
    randomString = randomString + Math.floor(Math.random() * 10)
}

const getString = () => {
    let pingpongAmount = undefined
    try {
        pingpongAmount = Number(fs.readFileSync(pingpongAmountPath, { encoding: "utf8" }))
    } catch (error) {
        console.log(error)
    }
    return `${new Date()}:${randomString}\nPing / Pongs: ${pingpongAmount}`
}

const writeString = () => {
    fs.writeFile(randomStringPath, getString(), err => {
        if (err) console.log(err)
    })
    setTimeout(writeString, 5000)
}

app.listen(PORT)

writeString()
