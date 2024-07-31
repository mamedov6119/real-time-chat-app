import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import express from "express";
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const hostname = "localhost";
const port = process.env.PORT || 5000;

// const db = getFirestore();

app.prepare().then(() => {
  const expressApp = express();
  const httpServer = createServer(expressApp);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("chat message", async (msg) => {
      try {
        // Save message to Firestore
        const newMessage = {
          uid: msg.uid,
          message: msg.message,
          createdAt: Timestamp.now(),
        };
        // const docRef = await db.collection('messages').add(newMessage);
        
        // Add Firestore document ID to the message
        newMessage.id = docRef.id;

        // Emit the message to all connected clients
        io.emit("chat message", newMessage);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    });
  });

  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });

  httpServer.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });
});
