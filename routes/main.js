const express = require("express");
const router = express.Router();
const ffmpeg = require("ffmpeg");
const ytdl = require("ytdl-core");
const fs = require("fs");
const request = require("request");

router.get("/", (req, res) => {
  res.render("download");
});

router.get("/error", (req, res) => {
  res.render("error");
});

router.post("/getYourFile", (req, res) => {
  var file = fs.createWriteStream("video.mp4");
  const url = req.body.url;
  const n = url.search("youtube");
  if (n !== -1) {
    res.cookie("checkA", 1, { maxAge: 90000000 });
    ytdl(url, {
      filter: format => format.container === "mp4"
    }).pipe(fs.createWriteStream("video.mp4", { bufferSize: 64 * 1024 }));
    res.render("download");
  } else {
    res.status(403).render("error");
  }
});

router.post("/getVideo", (req, res) => {
  res.cookie("checkA", 0);
  res.download(__dirname + "/../video.mp4");
});

function deleteFile(file) {
  fs.unlink(file, function(err) {
    if (err) {
      console.error(err.toString());
    } else {
      console.warn(file + " deleted");
    }
  });
}

module.exports = router;
//.pipe(fs.createWriteStream("video.mp4"));
