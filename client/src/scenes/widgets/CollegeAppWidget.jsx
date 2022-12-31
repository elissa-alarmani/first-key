import { Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";

const CollegeAppWidget = ({
  college,
  appStatus,
}) => {
  const { palette } = useTheme();
  let labelColor;
  let statusLabel;

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
      labelColor = palette.primary.main;
      statusLabel = "Waitlisted";
      break;
    default:
      labelColor = palette.neutral.main;
      statusLabel = "Pending";
  }

  return (
    <WidgetWrapper m="2rem 0">
      <Typography variant="h6" color={palette.neutral.main}>
        {college}
      </Typography>
      <Typography variant="subtitle1" color={labelColor}>
        {statusLabel}
      </Typography>
    </WidgetWrapper>
  );
};

export default CollegeAppWidget;

