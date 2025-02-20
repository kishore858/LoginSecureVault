const Credential = require("../models/Credential");
const axios = require("axios");
const cheerio = require("cheerio");
const cryptoRandomString = require("crypto-random-string");

const getWebsiteLogo = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        let logo = $('link[rel="icon"]').attr("href") || $('link[rel="shortcut icon"]').attr("href");

        if (logo && !logo.startsWith("http")) {
            const baseUrl = new URL(url);
            logo = baseUrl.origin + logo;
        }
        return logo;
    } catch (error) {
        console.error("Error fetching website logo:", error);
        return null;
    }
};

exports.addCredential = async (req, res) => {
    try {
        const { website, loginUsername, password, remarks } = req.body;
        const sno = (await Credential.countDocuments()) + 1;
        const websiteImage = await getWebsiteLogo(website);
        const uploadFile = req.file ? `/uploads/${req.file.filename}` : null;

        const credential = new Credential({
            sno,
            website,
            loginUsername,
            password,
            remarks,
            websiteImage,
            uploadFile
        });

        await credential.save();
        res.status(201).json({ message: "Credential saved successfully!", credential });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCredential = async (req, res) => {
    const { website, loginUsername } = req.query;
    if (!website || !loginUsername) {
        return res.status(400).json({ message: "Website and Login Username are required!" });
    }

    try {
        const credential = await Credential.findOne({ website, loginUsername });
        if (!credential) {
            return res.status(404).json({ message: "Credential not found!" });
        }
        res.json(credential);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
