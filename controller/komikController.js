const db = require("../models");

async function getAllKomik(req, res) {
    try {
        const komik = await db.Komik.findAll();
        res.status(200).json(komik);
    } catch (error) {
        console.error("Error retrieving komik:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getKomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: "Komik not found" });
        }
        res.status(200).json(komik);
    } catch (error) {
        console.error("Error retrieving komik:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


async function createKomik(req, res) {
    const { judul, description, author } = req.body;
    try {
        const newKomik = await db.Komik.create({ judul, description, author });
        res.status(201).json(newKomik);
    } catch (error) {
        console.error("Error creating komik:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateKomik(req, res) {
    const { id } = req.params;
    const { judul, description, author } = req.body;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: "Komik not found" });
        }
        
        komik.judul = judul;
        komik.description = description;
        komik.author = author;
        await komik.save();
        res.status(200).json(komik);
    } catch (error) {
        console.error("Error updating komik:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


async function deleteKomik(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: "Komik not found" });
        }
        await komik.destroy();
        res.status(200).json({ message: "Komik deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting komik:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getAllKomik,
    getKomikById,
    createKomik,
    updateKomik,
    deleteKomik
};