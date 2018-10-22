const express = require("express");
const multer = require("multer");
const fs = require("fs")

const publicPath = "public/"
const photoPath = "public/uploads/"
const port = 3000

const app = express()

app.set("view engine", "pug")

app.use(express.static(publicPath));
const upload = multer({ dest: photoPath })

const uploadedFiles = [];
console.log(uploadedFiles)
app.get("/", (request, response) => {
    const path = './public/uploads';
    fs.readdir(path, (err, items) => {
        // console.log(items);
        response.render("index", { photos: items, imagePathArray: uploadedFiles })
    });
})

app.post('/uploads', upload.single('myFile'), function (request, response, next) {
    console.log("Uploaded: " + request.file.filename);
    uploadedFiles.push(request.file.filename);
    response.end(`<h1>Uploaded file!</h1>
    <a href="/">Back to homepage!</a>
    <hr>
    <img src="uploads/${request.file.filename}"/>`);
})

app.listen(port, () => console.log("hello world"));