import "dotenv/config"

import express from 'express';

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    return res.send("Hello to server");
});

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));