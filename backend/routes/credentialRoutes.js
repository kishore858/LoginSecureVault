const express = require("express");
const multer = require("multer");
const { addCredential, getCredential } = require("../controllers/credentialController");

const router = express.Router();
const upload = multer({ dest: "backend/uploads/" });

router.post("/add", upload.single("file"), addCredential);
router.get("/get", getCredential);

module.exports = router;
