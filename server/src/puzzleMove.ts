import express, { Request, Response } from "express";
import { Server } from "socket.io";

module.exports = (io: Server) => {
  const router = express.Router();

  io.on("connection", (socket) => {
    console.log("New connection, id: " + socket.id);
    
    io.on("puzzleMove", (data) => {
      console.log(data);
    });
  });

  router.post("/", (_req: Request, res: Response) => {
    res.send("Hello World!");
  });

  return router;
};
