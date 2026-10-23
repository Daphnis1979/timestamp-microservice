import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));


app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get("/api", (req, res) => {
  res.json({
    "unix": Date.now(),
    "utc": new Date().toUTCString()
  })
})

app.get("/api/:date", (req, res) => {
  const datestring = req.params.date;

  let date;

  if (/^\d+$/.test(datestring)) {
    date = new Date(Number(datestring));
  } else {
    date = new Date(datestring);
  }

  if (isNaN(date.getTime())) {
    res.json({
      error: "Invalid Date"
    });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
