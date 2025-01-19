const express = require("express");
const cors = require("cors");
const { promises: fs } = require("fs");
const serverless = require("serverless-http");
const path = require("path");

const app = express();
app.use(cors());

/*** FOR VERCEL DEPLOYMENT ***/

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all domains
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Get the absolute path to `products.json`
const PRODUCTS_FILE = path.join(__dirname, "../products.json");

app.get("/", (req, res) => res.send("Buddy's Express server is running on Vercel!"));

app.get("/products", async (req, res) => {
    try {
        const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
        const products = JSON.parse(data);
        res.json(products);
    } catch (error) {
        console.error("Error reading products file:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = app;
module.exports.handler = serverless(app);