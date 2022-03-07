const express = require("express");
const app = express();

app.get("/book", logger, (req, res) => {
  return res.json({ route: "/book" });
});

app.get("/libraries", logger, checkPermission("librarian"), (req, res) => {
  if (req.permission === true) {
    return res.json({ route: "/libraries", permission: true });
  }
});

app.get("/authors", logger, checkPermission("author"), (req, res) => {
  if (req.permission === true) {
    return res.json({ route: "/authors", permission: true });
  }
});

function checkPermission(role) {
  return function logger2(req, res, next) {
    if (role === "librarian") {
      req.permission = true;
      next();
    } else if (role === "author") {
      req.permission = true;
      next();
    }
  };
}

function logger(req, res, next) {
  console.log(req.path);
  next();
}

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
