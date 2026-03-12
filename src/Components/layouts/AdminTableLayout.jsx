import {
  Container,
  Typography,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Alert,
} from "@mui/material";

/**
 * 
 * 
 * @param {string}      title         – Page heading
 * @param {Array}       columns       – [{ key, label, render? }]
 * @param {Array}       data          – Row data array
 * @param {number}      page          – Current page (0-indexed for MUI)
 * @param {Function}    onPageChange  – (event, newPage) => void
 * @param {number}      rowsPerPage   – Rows per page
 * @param {Function}    onRowsPerPageChange – (event) => void
 * @param {number}      totalCount    – Total number of records (for pagination label)
 * @param {boolean}     isLoading     – Show loading spinner
 * @param {boolean}     isError       – Show error alert
 * @param {ReactNode}   headerActions – Buttons rendered in the top-right area
 * @param {Function}    getRowId      – (row) => unique id
 */
const AdminTableLayout = ({
  title,
  columns = [],
  data = [],
  page = 0,
  onPageChange,
  rowsPerPage = 10,
  onRowsPerPageChange,
  totalCount,
  isLoading = false,
  isError = false,
  headerActions,
  headerContent,
  getRowId = (row) => row.id || row._id,
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          An error occurred while fetching data. Please try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* ── Page header ── */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={2}
        mb={3}
      >
        <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.75rem", sm: "2.125rem" } }}>
          {title}
        </Typography>
        {headerActions && (
          <Box display="flex" gap={1} width={{ xs: "100%", sm: "auto" }}>
            {headerActions}
          </Box>
        )}
      </Box>


      {/* ── Table card ── */}
      <Card
        variant="outlined"
        sx={{
          borderRadius: 2,
          boxShadow: "0 0 2px 0 rgba(145,158,171,.2), 0 12px 24px -4px rgba(145,158,171,.12)",
          overflow: "hidden",
        }}
      >
        {headerContent && headerContent}
        <TableContainer>
          <Table>
            {/* ── Head ── */}
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#F4F6F8",
                }}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    sx={{
                      fontWeight: 600,
                      color: "#637381",
                      fontSize: "0.875rem",
                      textTransform: "capitalize",
                      py: 2,
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* ── Body ── */}
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{ py: 6, color: "text.secondary" }}
                  >
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow
                    key={getRowId(row)}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      transition: "background-color 0.2s",
                    }}
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        sx={{ py: 2, fontSize: "0.875rem" }}
                      >
                        {col.render ? col.render(row) : row[col.key] || "N/A"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ── Pagination ── */}
        <TablePagination
          component="div"
          count={totalCount ?? (data.length < rowsPerPage ? page * rowsPerPage + data.length : -1)}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            ".MuiTablePagination-toolbar": { px: 2 },
          }}
        />
      </Card>
    </Container>
  );
};

export default AdminTableLayout;
