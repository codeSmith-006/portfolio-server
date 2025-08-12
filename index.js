// server.js

// Import Express
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
// Create an Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // creating database
    const db = client.db("Project"); // Database name
    featureProjectCollection = db.collection("featureProject"); // Collection name

    // ------------------------GET------------------------
    // GET all feature projects
    app.get("/feature-projects", async (req, res) => {
      try {
        const projects = await featureProjectCollection.find().toArray();
        // console.log("Projects: ", projects);
        res.send(projects);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch feature projects" });
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Example GET route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Example POST route
app.post("/data", (req, res) => {
  res.json({
    message: "Data received",
    yourData: req.body,
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
