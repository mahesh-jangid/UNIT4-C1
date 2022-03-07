const express = require("express");
const app = express();

app.get("/book", logger, (req, res) => {
  return res.json({ route: "/books" });
});

app.get("/libraries", logger, checkPermission("libraries"), (req, res) => {
  return res.json({ route: "/libraries", permission: true });
});

app.get("/authors ", logger, checkPermission("authors"), (req, res) => {
  return res.json({ route: "/authors", permission: true });
});
app.use(logger);
function checkPermission(role) {
  return function logger1(req, res, next) {
    if (role === "libraries") {
      return next();
    } else {
      return next();
    }
  };
}

function logger(req, res, next) {
  if (req.path === "/libraries") {
    req.role = "libraries";
  } else if (req.path === "/authors") {
    req.role = "authors";
  } else if (req.path === "/book") {
    req.role = "book";
  }
  next();
}

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
