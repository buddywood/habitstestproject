const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(cors());

const PORT = 5001;

// Serve products
app.get("/products", (req, res) => {
    const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
    res.json(products);
});

//  Export `app` without calling `listen()` directly
module.exports = app;

// Start server only if not in test mode
if (require.main === module) {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}