const express = require("express");
const connectionDatabase = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/api"));

async function startServer() {
    await connectionDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}

startServer();