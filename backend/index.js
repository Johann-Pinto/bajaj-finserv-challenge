const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Utility function to find the highest lowercase alphabet
const getHighestLowercaseAlphabet = (array) => {
  const lowercaseAlphabets = array.filter((char) => char >= "a" && char <= "z");
  return lowercaseAlphabets.sort().slice(-1)[0];
};

// GET method endpoint that returns an operation_code
app.get("/", (req, res) => {
  res.status(200).json({ operation_code: "OP123456" });
});

// POST method endpoint that takes user input and returns the required data
app.post("/", (req, res) => {
  const {
    status,
    userId,
    collegeEmailId,
    collegeRollNumber,
    numbers,
    alphabets,
  } = req.body;

  if (
    !status ||
    !userId ||
    !collegeEmailId ||
    !collegeRollNumber ||
    !numbers ||
    !alphabets
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const highestLowercaseAlphabet = getHighestLowercaseAlphabet(alphabets);

  res.status(200).json({
    status,
    userId,
    collegeEmailId,
    collegeRollNumber,
    numbers,
    alphabets,
    highestLowercaseAlphabet,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
