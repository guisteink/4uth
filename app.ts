const express = require("express");

export let app = express();
const router = express.Router();

app.listen(3333, () => {
  console.log("listening on port 3333 🔥");
});

router.get("/health-check", (req: any, res: any) => {
  res.status(200).json({ message: "Hello World", success: true });
});

app.use(router);
