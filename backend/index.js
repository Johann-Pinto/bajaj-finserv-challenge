const express = require("express");
const bodyParser = require("body-parser");

const app = express();
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
        user_id: "",
        email: "",
        roll_number: "",
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
      user_id: "name", // Replace with actual data if available
      email: "email@example.com", // Replace with actual data if available
      roll_number: "roll_number", // Replace with actual data if available
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
    });
  } catch (error) {
    // Handle any unexpected errors
    res.json({
      is_success: false,
      user_id: "",
      email: "",
      roll_number: "",
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
app.listen(port, () => {
  console.log("Server is running on http://localhost:${port}");
});
