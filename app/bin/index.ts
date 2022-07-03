import http from "http";
import { app } from "../src/index";

const server = http.createServer(app);

const PORT = 3030;

server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}.`);
});

server.on("error", (err) => {
    console.log(`An error occurred. ${err}`);
})