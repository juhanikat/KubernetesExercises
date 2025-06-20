import express from "express";

const app = express()
const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
}); 