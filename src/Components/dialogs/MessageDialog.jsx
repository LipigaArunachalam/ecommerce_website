import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const MessageDialog = ({
  open,
  onClose,
  title = "Notification",
  message,
  buttonText = "OK",
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ fontWeight: 600, borderRadius: 1.5, px: 3 }}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageDialog;
