import { Server } from "socket.io";
import express, { Request, Response } from "express";
import * as http from "http";
import cors from "cors";

const app = express();

app.use(cors());


const server = http.createServer(app);

const whiteList = ["http://localhost:3000"];

const io = new Server(server, {
  cors: {
    origin: whiteList,
    methods: ["POST"],
  },
});
// Routing
app.use("/puzzleMove", require("./puzzleMove")(io));

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
