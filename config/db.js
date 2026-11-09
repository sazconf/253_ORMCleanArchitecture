const db = require("../models");

async function connectDatabase() {
        try {
            await db.sequelize.authenticate();
            console.log("Database connected successfully.");

            await db.sequelize.sync('Database synchronized successfully.');
            console.log("Database synchronized successfully.");


        } catch (error) {
            console.error("Unable to connect to the database:", error);
            process.exit(1);
        }
}

module.exports = connectDatabase;

