import express from "express"
import fs from "fs"
import path from "path"

const app = express()
const PORT = process.env.PORT

const filepath = path.join('/', 'usr', 'src', 'app', 'files', 'randomstring.txt')

let randomString = ""
for (let i = 0; i < 10; i++) {
    randomString = randomString + Math.floor(Math.random() * 10)
}

const getString = () => {
    return `${new Date()}:${randomString}`
}

const writeString = () => {
    fs.writeFile(filepath, getString(), err => {
        if (err) console.log(err)
    })
    setTimeout(writeString, 5000)
}

app.listen(PORT)

writeString()
