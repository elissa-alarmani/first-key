import {
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Divider,
  InputBase,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCollegeApps } from "state";

const MyCollegeAppWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [collegeApp, setCollegeApp] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;

  const handleCollegeApp = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", collegeApp);


    const response = await fetch(`http://localhost:3001/collegeApps`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const collegeApps = await response.json();
    dispatch(setCollegeApps({ collegeApps }));
    setCollegeApp("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setCollegeApp(e.target.value)}
          value={collegeApp}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem"></FlexBetween>

        {isNonMobileScreens ? (
          <></>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!collegeApp}
          onClick={handleCollegeApp}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          CREATE APPLICATION
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyCollegeAppWidget;
