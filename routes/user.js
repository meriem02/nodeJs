const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validate = require("../middl/validate");
router.post("/addUser", validate, userController.add);
router.get("/show", userController.show);
router.put("/update/:id", userController.update);
router.delete("/delete/:id", userController.deleteclass);
router.post("/authenticate", userController.authenticate);




///// pour acceder à l interface twig
router.get("/login", (req, res, next) => {
    res.render("login");
});
router.get("/register", (req, res, next) => {
    res.render("register");
});
router.get("/dashboard", (req, res, next) => {
    res.render("dashboard");
});

router.get("/userDashboard", (req, res, next) => {
    res.render("userDashboard");
});
module.exports = router;
