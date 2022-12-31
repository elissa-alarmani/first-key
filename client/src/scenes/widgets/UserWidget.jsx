import {
    EditOutlined
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "components/UserImage";
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  
  const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const [linkedInURL, setLinkedInURL] = useState('');
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
  
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    };
  
    useEffect(() => {
      getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    if (!user) {
      return null;
    }
  
    const {
      firstName,
      lastName,
      hsGradYear,
    } = user;
  
    return (
      <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
              >
                {firstName} {lastName} ({hsGradYear})
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
  
        <Divider />
  
  
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>
  
          <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
      <img src="../assets/linkedin.png" alt="linkedin" />
      <Box>
        <Typography color={main} fontWeight="500">
          LinkedIn
        </Typography>
        {linkedInURL ? (
          <Typography> <a href={linkedInURL} target="_blank">{linkedInURL}</a> </Typography>
        ) : (
          <input
            type="text"
            placeholder="Add your LinkedIn URL"
            value={linkedInURL}
            onChange={(e) => setLinkedInURL(e.target.value)}
            />
        )}
      </Box>
    </FlexBetween>
           
          </FlexBetween>
        </Box>
      </WidgetWrapper>
    );
  };
  
  export default UserWidget;