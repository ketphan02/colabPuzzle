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

io.on("connection", (socket) => {
  console.log("New connection, id: " + socket.id);

  socket.on("puzzleMove", (data) => {
    socket.broadcast.emit("puzzleMove", data);
  });

  socket.on("puzzleDrop", (data) => {
    console.log("puzzleDrop", data.newPiece.startPosition);
    socket.broadcast.emit("puzzleDrop", data);
  });
});
const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
