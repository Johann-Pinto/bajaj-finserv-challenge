import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

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
      // First, try to parse the JSON input
      const parsedJson = JSON.parse(jsonInput);
      setError(""); // Clear any previous errors

      try {
        // If parsing succeeds, proceed with the API call
        const res = await fetch("https://your-heroku-app.herokuapp.com/bfhl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedJson),
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setResponse(data);
        setDropdownOptions([
          "Alphabets",
          "Numbers",
          "Highest Lowercase Alphabet",
        ]);
      } catch (fetchError) {
        // Handle any errors that occur during the fetch call
        setError(`Failed to fetch data: ${fetchError.message}`);
      }
    } catch (jsonError) {
      // Handle any errors that occur during JSON parsing
      setError("Invalid JSON format");
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedOptions(e.target.value);
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
        className="w-full text-lg rounded-md bg-blue-600 text-white py-2 mt-3"
        onClick={handleJsonSubmit}
      >
        Submit
      </button>

      {/* <Button variant="contained" className="mt-4 w-full" onClick={handleJsonSubmit}>
        Submit
      </Button> */}

      {dropdownOptions.length > 0 && (
        <FormControl fullWidth className="mt-4">
          <InputLabel>Select Options</InputLabel>
          <Select
            multiple
            value={selectedOptions}
            onChange={handleDropdownChange}
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
