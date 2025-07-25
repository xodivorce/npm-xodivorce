// Node.js script to make an HTTPS GET request and log status and content type.
// Expects: Status: 200; Content-Type: application/pdf

import https from "https";

https.get("<https://your-domain/path/to/your-resume.pdf>", (res) => {
  console.log("Status:", res.statusCode);
  console.log("Content-Type:", res.headers["content-type"]);
});
