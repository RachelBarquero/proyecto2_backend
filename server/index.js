const express = require('express');
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost:27017/users");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
const {userGet,  userPost,  loginGet} = require('./controllers/userController');
const {videoGet,  videoPost,  videoPatch, videoDelete} = require('./controllers/videoController');
const { kidGet,  kidPost,  kidPatch,  kidDelete,  kidLogin} = require('./controllers/kidController');
app.use(cors({
  domains: '*',
  methods: "*"
}));

app.get("/api/users/",userGet);
app.get("/api/userLogin/",loginGet);
app.post("/api/users", userPost);

app.get("/api/videos/",videoGet);
app.post("/api/videos", videoPost);
app.patch("/api/videos", videoPatch);
app.delete("/api/videos", videoDelete);

app.get("/api/kids/",kidGet);
app.get("/api/kidLogin",kidLogin);
app.post("/api/kids", kidPost);
app.patch("/api/kids", kidPatch);
app.delete("/api/kids", kidDelete);

app.listen(3001, () => console.log("Example app listening on port 3001!"))