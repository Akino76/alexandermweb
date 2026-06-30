const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = "/Users/alexmadsen/Desktop/alexandermweb";
const PORT = 8123;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
};

http
  .createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p.endsWith("/")) p += "index.html";   // serve directory indexes
    const fp = path.join(ROOT, p);
    if (!fp.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end("forbidden");
    }
    fs.readFile(fp, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("not found");
      }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(fp)] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(PORT, () => console.log("listening on " + PORT));
