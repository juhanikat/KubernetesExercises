import express from "express";

const app = express()
const PORT = process.env.PORT

let counter = 0

app.get("/pingpong", (req, res) => {
    const message = `pong ${counter}`
    counter = counter + 1
    res.send(message)
})

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
}); 