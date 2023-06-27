const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Set up a route for serving the HTML page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Create an array to store connected clients
const clients = [];

// WebSocket connection handling
wss.on("connection", (ws) => {
  // Add new client to the list
  clients.push(ws);

  // Handle incoming messages from clients
  ws.on("message", (message) => {
    // Broadcast the message to all connected clients
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  ws.on("close", () => {
    // Remove the client from the list
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 4444;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
