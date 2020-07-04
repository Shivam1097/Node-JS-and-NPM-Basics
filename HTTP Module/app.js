const http = require('http')
const fs = require('fs')
const path = require('path')

const HOSTNAME = "localhost"
const PORT = 3000

const server = http.createServer(function(req, res) {

    console.log(`Request URL : ${req.url} and Method : ${req.method}`) //Request URL : / and Method : GET

    if (req.method == "GET") {
        let fileURL;
        if (req.url == "/")
            fileURL = "/index.html"
        else
            fileURL = req.url

        let filePath = path.resolve('./public' + fileURL)
        const fileExtension = path.extname(filePath)
        if (fileExtension == '.html') {
            fs.exists(filePath, function(isExist) {
                if (!isExist) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end("<html><body><h1>Error 404: Not Found</h1></body></html>");
                    return;
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            })
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end("<h1>Enter valid URL</h1>")
        }

    } else {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/html');
        res.end("<h1>Request type not allowed</h1>")
    }
})

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server started at http://${HOSTNAME}:${PORT}`)
})