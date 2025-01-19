const express = require("express");
const cors = require("cors");
const fs = require("fs").promises; // Use async fs
const app = express();
app.use(cors());

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all domains
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => res.send("Buddy's Express server is running on Vercel!"));

// Serve products (ASYNC VERSION)
app.get("/products", async (req, res) => {
    try {
        const data = await fs.readFile("./products.json", "utf-8"); // Async read
        const products = JSON.parse(data);
        res.json(products);
    } catch (error) {
        console.error("Error reading products file:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server only when running locally
if (require.main === module) {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export app for Vercel
module.exports = app;