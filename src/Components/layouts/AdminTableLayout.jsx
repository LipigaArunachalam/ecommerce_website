import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

const AdminTableLayout = ({ columns, data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper"
      }}
    >
      <Table>

        {/* TABLE HEADER */}
        <TableHead
          sx={{
            backgroundColor: "#6a04a0"
          }}
        >
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  borderBottom: "2px solid #9c35c5"
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* TABLE BODY */}
        <TableBody
          sx={{
    "& .MuiTableCell-root": {
      backgroundColor: (theme) =>
        theme.palette.mode === "light"
          ? "rgba(156,53,197,0.03)"
          : "background.paper",
      color: "text.primary",
      borderColor: (theme) =>
        theme.palette.mode === "light"
          ? "rgba(0,0,0,0.08)"
          : "divider"
    }
  }}
        >
          {data.map((row, index) => (
            <TableRow
              key={index}
              hover
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(156,53,197,0.08)"
                }
              }}
            >
              {columns.map((col) => (
                <TableCell key={col.key}>

                  {/* ORDER ID highlight */}
                  {col.key === "order_id" ? (
                    <Box
                      sx={{
                        color: "#9c35c5",
                        fontWeight: 600
                      }}
                    >
                      {row[col.key]}
                    </Box>
                  ) : col.render ? (
                    col.render(row)
                  ) : (
                    row[col.key]
                  )}

                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default AdminTableLayout;