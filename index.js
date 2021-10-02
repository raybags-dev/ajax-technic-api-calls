const express = require("express");
const app = express();
const path = require("path");

const serveStatic = require("serve-static");

app.use("/public", express.static("public"));
app.use(
  serveStatic(path.join(__dirname, "public"), {
    maxAge: "1d",
    setHeaders: setCustomCacheControl,
  })
);

function setCustomCacheControl(res, path) {
  if (serveStatic.mime.lookup(path) === "text/html") {
    // Custom Cache-Control for HTML files
    res.setHeader("Cache-Control", "public, max-age=0");
  }
}

app.post("/api", (req, res)=>{

    console.log(req);
    res.status(200).json("received")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app is listening on port: ${PORT}`));
