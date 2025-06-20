import express from "express"

const app = express()
const PORT = process.env.PORT

let randomString = ""
for (let i = 0; i < 10; i++) {
    randomString = randomString + Math.floor(Math.random() * 10)
}

const getStatus = () => {
    return `${new Date()}:${randomString}`
}

const logRandomString = () => {
    console.log(getStatus())
    setTimeout(logRandomString, 5000)
}

app.get("/status", (req, res) => {
    res.send(getStatus())
})

app.listen(PORT)

logRandomString()
