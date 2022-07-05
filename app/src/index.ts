import bodyParser from "body-parser";
import express from "express";
import router from "./routes";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

export { app };