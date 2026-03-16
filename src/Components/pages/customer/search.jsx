import React, { useState } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Catalog from "./catalog";

const Search = () => {

  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setSearchTerm(input);
  };

  return (
    <Box >

      <TextField
        fullWidth
        label="Search products"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* pass search term to catalog */}
      <Catalog searchTerm={searchTerm} />

    </Box>
  );
};

export default Search;