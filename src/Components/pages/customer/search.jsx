import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
  Typography,
  Grid
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchProductQuery } from "../../../services/rtkQuery/customerApi";

const Search = () => {

  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useSearchProductQuery({prod:searchTerm});

  const handleSearch = () => {
    setSearchTerm(input);
  };

  return (
    <Box p={3}>

      {/* SEARCH BAR */}

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
          )
        }}
      />

      {/* LOADING */}

      {isLoading && (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      )}

      {/* RESULTS */}

      <Grid container spacing={3} mt={2}>

        {data?.map((product) => (

          <Grid item xs={12} sm={6} md={3} key={product.product_id}>

            <Box border="1px solid #ddd" p={2} borderRadius={2}>

              <img
                src={product.product_image_url}
                alt={product.product_name}
                style={{ width: "100%", height: 150, objectFit: "contain" }}
              />

              <Typography fontWeight={600}>
                {product.product_name}
              </Typography>

              <Typography color="primary">
                ₹ {product.price}
              </Typography>

            </Box>

          </Grid>

        ))}

      </Grid>

      {isError && (
        <Typography mt={3} color="error">
          Search failed
        </Typography>
      )}

    </Box>
  );
};

export default Search;