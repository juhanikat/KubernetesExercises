import { Buffer } from "buffer";
import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT;

const randomImageDir = path.join("/", "usr", "src", "app", "files");
const randomImagePath = path.join(
  "/",
  "usr",
  "src",
  "app",
  "files",
  "random_image.jpg"
);
console.log(fs.existsSync(randomImageDir));

app.use("/images", express.static(randomImageDir));
app.use(express.urlencoded());

const downloadRandomImage = async () => {
  try {
    const response = await fetch("https://picsum.photos/1200");
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(randomImagePath, buffer, (err) => console.log(err));
    console.log("Downloaded new random image");
  } catch (error) {
    console.log(error);
  }
  setTimeout(downloadRandomImage, 10 * 60000);
};

app.post("/newtodo", (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.get("/", async (req, res) => {
  if (!fs.existsSync(randomImagePath)) {
    await downloadRandomImage();
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
             <form action="/newtodo" method="post">
                <label for="new-todo-name">New todo:</label><br>
                <input type="text" id="new-todo-name" name="new-todo-name" maxlength="140"><br>
                <input type="submit" id="submit-todo-button" value="Submit">
            </form> 
            <ul>
                <li>Try to learn Kubernetes</li>
                <li>Get mad</li>
                <li>Come back tomorrow</li>
        </body>
        </html>
    `);
});

downloadRandomImage();

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
