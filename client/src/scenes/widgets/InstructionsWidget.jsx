import {
    EditOutlined
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "components/UserImage";
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  
  const InstructionsWidget = () => {
    return (
        <WidgetWrapper> 
        <Box p="1rem 0">
          {/* instructions for the user */}
          <Typography variant="body1">
            Here are some instructions for the user.
          </Typography>
        </Box>
        </WidgetWrapper>
    );
  };
  
  export default InstructionsWidget;