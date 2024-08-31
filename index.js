// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  let unix;
  let utc;

  if (!date) {
    date = Date.now();
  }

  if (new Date(date).getTime() > 0) {
    unix = Math.floor(new Date(date).getTime());
    utc = new Date(date).toUTCString();
  } else {
    unix = date;
    utc = new Date(parseInt(date)).toUTCString();
  }

  if (unix === "Invalid Date" || utc === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({ unix, utc });
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Your app is listening on http://localhost:" + listener.address().port
  );
});
