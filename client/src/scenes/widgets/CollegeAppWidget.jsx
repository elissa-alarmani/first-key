import { Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCollegeAppFromState } from "state";

const CollegeAppWidget = ({
  collegeAppUserId,
  collegeAppId,
  college,
  appStatus,

}) => {
  const { palette } = useTheme();
  let labelColor;
  let statusLabel;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3001/collegeApps/${collegeAppUserId}/collegeApps/${collegeAppId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      // dispatch an action to delete the college application from the state
      dispatch(deleteCollegeAppFromState(college._id));
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  switch (appStatus) {
    case "Accepted":
      labelColor = palette.success.main;
      statusLabel = "Accepted";
      break;
    case "Rejected":
      labelColor = palette.error.main;
      statusLabel = "Rejected";
      break;
    case "Deferred":
      labelColor = palette.warning.main;
      statusLabel = "Deferred";
      break;
    case "Waitlisted":
      labelColor = palette.neutral.orange;
      statusLabel = "Waitlisted";
      break;
    default:
      labelColor = palette.neutral.main;
      statusLabel = "Applied";
  }

  return (
    <WidgetWrapper m="2rem 0">
      <Typography
        variant="h6"
        style={{
          fontFamily: "Poppins",
          fontSize: "1.25rem",
          fontWeight: 500,
          color: palette.neutral.main,
        }}
      >
        {college}
      </Typography>
      <Typography
        variant="subtitle1"
        style={{
          fontFamily: "Poppins",
          fontSize: "1rem",
          fontWeight: 400,
          color: labelColor,
        }}
      >
        {statusLabel}
      </Typography>

      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this college application? This action cannot be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default CollegeAppWidget;