const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost:27017/tubekids");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
const { videoGet,  videoPost,  videoPatch,  videoDelete} = require('./controllers/videoController');

app.use(cors({
  domains: '*',
  methods: "*"
}));


app.get("/api/videos/",videoGet);
app.post("/api/videos", videoPost);
app.patch("/api/videos", videoPatch);
app.delete("/api/videos", videoDelete);

app.listen(3001, () => console.log("Example app listening on port 3001!"))