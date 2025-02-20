const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
    sno: { type: Number, unique: true },
    website: { type: String, required: true },
    loginUsername: { type: String, required: true },
    password: { type: String, required: true },
    remarks: { type: String },
    createdAt: { type: Date, default: Date.now },
    websiteImage: { type: String }, // URL of the fetched website logo
    uploadFile: { type: String } // Path of uploaded file (image/PDF)
});

module.exports = mongoose.model("Credential", credentialSchema);
