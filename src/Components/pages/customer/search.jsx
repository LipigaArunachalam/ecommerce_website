import React, { useState } from "react";
import { Box, TextField, IconButton, InputAdornment, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Catalog from "./catalog";
import { useGetAllCategoryQuery } from "../../../services/rtkQuery/customerApi";

const Search = () => {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: categories, isLoading: categoriesLoading } = useGetAllCategoryQuery();

  const handleSearch = () => {
    setSearchTerm(input);
    setSelectedCategory(""); // Clear category when searching
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName === selectedCategory ? "" : categoryName);
    setSearchTerm(""); // Clear search when selecting category
    setInput("");
  };

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        label="Search products"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          py: 2,
          gap: 1,
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <Button
          variant={selectedCategory === "" ? "contained" : "outlined"}
          onClick={() => handleCategoryClick("")}
          sx={{ borderRadius: 20, flexShrink: 0 }}
        >
          All
        </Button>
        {!categoriesLoading && categories?.map((cat) => {
          const categoryName = typeof cat === 'string' ? cat : cat.category_name;
          const categoryId = typeof cat === 'string' ? cat : (cat.category_id || cat.category_name);
          
          // Format label: agro_industry_and_commerce -> Agro Industry And Commerce
          const displayLabel = categoryName
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return (
            <Button
              key={categoryId}
              variant={selectedCategory === categoryName ? "contained" : "outlined"}
              onClick={() => handleCategoryClick(categoryName)}
              sx={{ 
                borderRadius: 20, 
                flexShrink: 0,
                textTransform: 'none', // Disable default uppercase to use our custom Case
                minWidth: 'auto',
                px: 3,
                whiteSpace: 'nowrap'
              }}
            >
              {displayLabel}
            </Button>
          );
        })}
      </Box>

      {/* pass states to catalog */}
      <Catalog searchTerm={searchTerm} selectedCategory={selectedCategory} />
    </Box>
  );
};

export default Search;