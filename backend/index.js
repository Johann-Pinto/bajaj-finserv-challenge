const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// POST route for /bfhl
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Check if data is present and is an array
    if (!data || !Array.isArray(data)) {
      return res.json({
        is_success: false,
        user_id: "Sashank_Chaturvedi_04122002",
        email: "sashankpc19@gmail.com",
        roll_number: "21BBS0174",
        numbers: [],
        alphabets: [],
        highest_lowercase_alphabet: "",
      });
    }

    // Initialize arrays to store numbers and alphabets
    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = "";

    // Loop through the data list and segregate numbers and alphabets
    data.forEach((item) => {
      if (typeof item === "string" && !isNaN(item)) {
        numbers.push(item);
      } else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
        // Update highest lowercase alphabet
        if (item >= "a" && item <= "z" && item > highestLowercaseAlphabet) {
          highestLowercaseAlphabet = item;
        }
      }
    });

    // Response object
    res.json({
      is_success: true,
      user_id: "Sashank_Chaturvedi_04122002",
      email: "sashankpc19@gmail.com",
      roll_number: "21BBS0174",
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
    });
  } catch (error) {
    // Handle any unexpected errors
    res.json({
      is_success: false,
      user_id: "Sashank_Chaturvedi_04122002",
      email: "sashankpc19@gmail.com",
      roll_number: "21BBS0174",
      numbers: [],
      alphabets: [],
      highest_lowercase_alphabet: "",
    });
  }
});

// GET route for /bfhl
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// Start the server
module.exports = app;
