const express = require("express");
const multer = require("multer");
const fs = require("fs")

const publicPath = "public/"
const photoPath = "public/uploads/"
const port = 3000

const app = express()

app.use(express.static(publicPath));
const upload = multer({ dest: photoPath })

const uploadedFiles = [];

function pictureDropper(photos) {
    let uploadedPhotos = ""
    for (let i = 0; i < photos.length; i++) {
        let photoNames = photos[i];
        uploadedPhotos += `<img src="/uploads/${photoNames}"/>`
    }
    return uploadedPhotos
}

app.get("/", (request, response) => {
    const path = './public/uploads';
    fs.readdir(path, function (err, items) {
        // console.log(items);
        response.send(
            `<center>
        <div id="headerDiv">
        <h1>Welcome to Kenziegram!</h1>
        </div>
        <link rel="stylesheet" href="style.css">
    <form id="user-create-form" action="/uploads" method="POST" enctype="multipart/form-data">
    <input type="file" name="myFile" id="myFile">
    <br>
    <button type="submit">Upload Image</button>
    </form>
    <div id="photoContainer">
    <div id="allPhotosDiv">
            <div id="photoDiv">
    ${pictureDropper(items)}
    </div>
    </div>
    </div>
    </center>`)
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