const http = require("http");
const fs = require("fs");
const path = require("path");
const socketIo = require("socket.io");

const csvFilePath = path.join(process.cwd(), "module1/metrics.csv");

// Create an HTTP server
// const server = http.createServer((req, res) => {
//   if (req.url === "/metrics") {
//     // Serve the CSV file when the /metrics endpoint is requested
//     const csvContent = fs.readFileSync(csvFilePath, "utf-8");
//     res.writeHead(200, { "Content-Type": "text/csv" });
//     res.end(csvContent);
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Not Found");
//   }
// });

const server = http.createServer((req, res) => {
  // Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');

  // Serve the CSV file when the /metrics endpoint is requested
  if (req.url === "/metrics") {
    const csvContent = fs.readFileSync(csvFilePath, "utf-8");

    // Parse the CSV content into a JSON structure
    const jsonData = parseCSV(csvContent);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(jsonData));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(8000, () => {
  console.log("HTTP server is running on port 8000");
});

// Create a WebSocket server
const io = socketIo(server, {
  cors: {
    origin: "*",
    allowedHeaders: ["*"],
  },
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Watch the CSV file for changes
  const watcher = fs.watch(csvFilePath, (eventType, filename) => {
    if (filename === "metrics.csv" && eventType === "change") {
      const csvContent = fs.readFileSync(csvFilePath, "utf-8");
      socket.emit("data-update", { data: parseCSV(csvContent) });
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");

    // Close the file watcher when the user disconnects
    watcher.close();
  });
});

// Implement your CSV parsing logic here
function parseCSV(csv) {
  // For example, split CSV into an array of objects
  const lines = csv.split("\n");
  const headers = lines[0].split(",");
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }

    result.push(obj);
  }

  return result;
}
