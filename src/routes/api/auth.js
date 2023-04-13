const router = require("express").Router();

const { signIn, signUp } = require("../../controllers/AuthController");

router.post("/signin", (req, res, next) => signIn(req, res, next));

router.post("/signup", (req, res, next) => signUp(req, res, next));

module.exports = router;
