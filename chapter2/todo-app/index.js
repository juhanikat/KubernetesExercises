import { Buffer } from "buffer";
import express from "express";
import fs from "fs";
import path from "path";

const app = express()
const PORT = process.env.PORT

const randomImageDir = path.join('/', 'usr', 'src', "app", "files")
const randomImagePath = path.join('/', 'usr', 'src', "app", "files", 'random_image.jpg')
console.log(fs.existsSync(randomImageDir))

app.use('/images', express.static(randomImageDir))

const downloadRandomImage = async () => {
    try {
        const response = await fetch("https://picsum.photos/1200")
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        fs.writeFileSync(randomImagePath, buffer, err => console.log(err))
        console.log("Downloaded new random image")
    } catch (error) {
        console.log(error)
    }
    setTimeout(downloadRandomImage, 10 * 60000)
}

app.get("/", async (req, res) => {
    if (!fs.existsSync(randomImagePath)) {
        await downloadRandomImage()
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
            <img src="/images/random_image.jpg">
        </body>
        </html>
    `)
})

downloadRandomImage()


app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
}); 