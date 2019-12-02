const express = require("express");
const path = require("path");

const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/views/index.html"));
})

app.listen(port, () => {
    console.log(`app is running on ${port}`);
})