import express from "express";

export let app: express.Application = express();
const router: express.Router = express.Router();

app.listen(3333, () => {
  console.log("listening on port 3333 🔥");
})

router.get("/health-check", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Hello World", success: true });
});

app.use(router);
