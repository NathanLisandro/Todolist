import { Request, Response, Router } from "express";
import express from "express";
import path from "path";

const routes = Router();
const app = express();

routes.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.use(express.static(path.join(__dirname, 'src', 'public')));

routes.get("/todo", (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'todo', 'index.html'));

});

routes.get("/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'styles.css'));
});

routes.get("/app.js", (req, res) => {
  res.sendFile(path.join(__dirname,  'public', 'app.js'));
});

export default routes;
