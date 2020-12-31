const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require("cors");
const path = require('path');

//Connect DB
mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("mongoDB is connected"))
.catch((err) => console.log(err))

app.use(cors())
app.use(express.json())

app.use("/auth", require("./routes/user"));

//Serve build
if(process.env.NODE_ENV === "production"){
    app.use(express.static("mern-heroku/build"))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "mern-heroku", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("Server is runing on port"))