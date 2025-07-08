import express from "express";
import fs from "fs";
import path from "path";


const app = express()
const PORT = process.env.PORT

const amountFilePath = path.join('/', 'usr', 'src', "app", "files", 'pingpongpamount.txt')

app.get("/pingpong", (req, res) => {
    let counter
    if (!(fs.existsSync(amountFilePath))) {
        counter = 0
    } else {
        counter = Number(fs.readFileSync(amountFilePath, "utf8"))
    }

    counter = counter + 1

    const message = `pong ${counter}`
    fs.writeFileSync(amountFilePath, String(counter), err => {
        if (err) console.log(err)
    })
    res.send(message)
})

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
}); 