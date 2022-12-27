
  import { Typography, useTheme } from "@mui/material";
  import WidgetWrapper from "components/WidgetWrapper";
  
  const CollegeAppWidget = ({
    description,
  }) => {
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
  
  
    return (
      <WidgetWrapper m="2rem 0">        
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
      </WidgetWrapper>
    );
  };
  
  export default CollegeAppWidget;