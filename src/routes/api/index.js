const router = require("express").Router();

router.use("/", require("./users"));
router.use("/", require("./auth"));

router.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).map((key) => ({
        [key]: err.errors[key]?.message ?? null,
      })),
    });
  }

  return next(err);
});

module.exports = router;