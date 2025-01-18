const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(cors());

const PORT = 5000;

// Serve products
app.get("/products", (req, res) => {
    const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
    res.json(products);
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
