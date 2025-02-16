require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000
const API_URL = process.env.API_URL; // Use API_URL from .env

app.use(express.json());

// Allow all origins during development
app.use(cors());
// CORS Configuration (commented out for local development)
/*
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN, // Use ALLOWED_ORIGIN from .env
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
*/

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL); // Use API_URL from .env
    const data = response.data;
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data from the external API",
      error: error.message,
    });
  }
});

app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
