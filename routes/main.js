const express = require("express");
const router = express.Router();
const ffmpeg = require("ffmpeg");
const ytdl = require("ytdl-core");

router.get("/", (req, res) => {
  res.render("download");
});

router.post("/getYourFile", (req, res) => {
  const url = req.body.url;
  // console.log(url);
});

router.get;

module.exports = router;
