const express = require("express");
const connectDB = require("./config/db");
const credentialRoutes = require("./routes/credentialRoutes");
const cors = require("cors");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("backend/uploads"));
app.use("/api/credentials", credentialRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
