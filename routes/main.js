const express = require("express");
const router = express.Router();
const ffmpeg = require("ffmpeg");
const ytdl = require("ytdl-core");
const fs = require("fs");

router.get("/", (req, res) => {
  res.render("download");
});

router.get("/error", (req, res) => {
  res.render("error");
});

router.post("/getYourFile", (req, res) => {
  const url = req.body.url;
  const n = url.search("youtube");
  if (n !== -1) {
    res.cookie("checkA", 1, { maxAge: 90000000 });
    ytdl(url, {
      filter: format => format.container === "mp4"
    }).pipe(fs.createWriteStream("video.mp4"));
    res.render("download");
  } else {
    res.status(403).render("error");
  }
});

router.post("/getVideo", (req, res) => {
  res.cookie("checkA", 0);
  var file = __dirname + "/../video.mp4";
  res.download(__dirname + "/../video.mp4");
  // fs.unlink(file, function(err) {
  //   if (err) return console.log(err);
  //   console.log("file deleted successfully");
  // });
});

module.exports = router;
//.pipe(fs.createWriteStream("video.mp4"));
