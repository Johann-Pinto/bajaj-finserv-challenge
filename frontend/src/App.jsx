import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import { Typography } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleJsonSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setError("");

      const res = await fetch("http://localhost:3000/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedJson),
      });

      const data = await res.json();
      setResponse(data);
      setDropdownOptions([
        "Alphabets",
        "Numbers",
        "Highest Lowercase Alphabet",
      ]);
    } catch (e) {
      setError("Invalid JSON format");
    }
  };

  const handleDropdownChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(typeof value === "string" ? value.split(",") : value);
  };

  const renderResponse = () => {
    if (!response) return null;

    const result = {};
    if (selectedOptions.includes("Alphabets"))
      result.Alphabets = response.alphabets;
    if (selectedOptions.includes("Numbers")) result.Numbers = response.numbers;
    if (selectedOptions.includes("Highest Lowercase Alphabet"))
      result.HighestLowercaseAlphabet = response.highestLowercaseAlphabet;

    return (
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <Typography variant="h6">Response:</Typography>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="m-10">
      <TextField
        className="mb-4"
        label="JSON Input"
        fullWidth
        variant="outlined"
        value={jsonInput}
        onChange={handleJsonChange}
        error={!!error}
        helperText={error}
      />

      <button
        className="w-full text-lg rounded-md bg-blue-600 text-white py-2 my-3"
        onClick={handleJsonSubmit}
      >
        Submit
      </button>

      {dropdownOptions.length > 0 && (
        <FormControl fullWidth className="mt-4">
          <InputLabel>Select Options</InputLabel>
          <Select
            multiple
            value={selectedOptions}
            onChange={handleDropdownChange}
            input={<OutlinedInput label="Select Options" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {dropdownOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
