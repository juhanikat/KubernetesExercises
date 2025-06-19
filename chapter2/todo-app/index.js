import http from "http";

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Hello world!")
});

server.listen(PORT, 'localhost', () => {
    console.log(`Server started in port ${PORT}`);
}); 