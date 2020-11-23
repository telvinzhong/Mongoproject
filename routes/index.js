var express = require('express');
var router = express.Router();
const myDB = require("../db/myDB.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/users");
});

router.get("/users", async (req, res) => {
  const page = req.query.page || 1;
  console.log("/users", page);

  try {
    const users = await myDB.getUsers(page);
    console.log("got users", users);
    res.render("users", {
      users: users,
      // err: req.session.err,
      // msg: req.session.msg,
    });
  } catch (err) {
    console.log("got error", err);
    res.render("users", { err: err.message, users: [] });
  }
});

router.post("/users/delete", async (req, res) => {
  try {
    const user = req.body;
    const { lastID, changes } = await myDB.deleteUser(user);

    console.log(lastID, changes);
    if (changes === 0) {
      // req.session.err = `Couldn't delete the object ${user.Name}`;
      res.redirect("/users");
      return;
    }

    req.session.msg = "user deleted";
    res.redirect("/users");
    return;
  } catch (err) {
    console.log("got error delete");
    // req.session.err = err.message;
    res.redirect("/users");
    return;
  }
});

router.post("/users/update", async (req, res) => {
  try {
    const user = req.body;
    const result = await myDB.updateUser(user);

    if (result.result.ok) {
      req.session.msg = "user Updated";
      res.redirect("/users");
      return;
    } else {
      // req.session.err = "Error updating";
      res.redirect("/users");
    }
  } catch (err) {
    console.log("got error update");
    // req.session.err = err.message;
    res.redirect("/users");
  }
});

router.post("/users/create", async (req, res) => {
  const user = req.body;

  try {
    console.log("Create user", user);
    await myDB.createUser(user, res);
    req.session.msg = "user created";
    res.redirect("/users");
  } catch (err) {
    // req.session.err = err.message;
    res.redirect("/users");
  }
});

module.exports = router;
