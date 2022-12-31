import {
  Divider,
  InputBase,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCollegeApps } from "state";
import FormControl from "@mui/material/FormControl";
import { Select, MenuItem } from "@mui/material";

const MyCollegeAppWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [college, setCollege] = useState("");
  const [appStatus, setAppStatus] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;

    // COSTT4_A : average cost of attendance
  // UNITID: id of school
  // INSTNM: name
  // STABBR: state code
  // CITY: city
  // ADM_RATE: acceptance rate
  // UGDS: Undergrad population
  // 100 *( 1 - UGDS_WHITE ): % POC
  // FIRST_GEN: population first gen


  const handleCollegeApp = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("college", college);
    formData.append("appStatus", appStatus);

    const response = await fetch(`http://localhost:3001/collegeApps`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const collegeApps = await response.json();
    dispatch(setCollegeApps({ collegeApps }));
    setCollege("");
    setAppStatus("");
  };

  // const handleCollegeApp = async () => {
  //   // Check if the application already exists in the database
  //   const response = await fetch(`http://localhost:3001/collegeApps`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const existingApps = await response.json();
  
  //   // If the application already exists, update it
  //   if (existingApps.length > 0) {
  //     const formData = new FormData();
  //     formData.append("appStatus", appStatus);
  
  //     await fetch(`http://localhost:3001/collegeApps/${existingApps[0]._id}`, {
  //       method: "PUT",
  //       headers: { Authorization: `Bearer ${token}` },
  //       body: formData,
  //     });
  //   }
  //   // If the application does not exist, create it
  //   else {
  //     const formData = new FormData();
  //     formData.append("userId", _id);
  //     formData.append("college", college);
  //     formData.append("appStatus", appStatus);
  
  //     await fetch(`http://localhost:3001/collegeApps`, {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${token}` },
  //       body: formData,
  //     });
  //   }
  
  //   // Update the collegeApps state and reset the form
  //   const updatedResponse = await fetch(`http://localhost:3001/collegeApps`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const collegeApps = await updatedResponse.json();
  //   dispatch(setCollegeApps({ collegeApps }));
  //   setCollege("");
  //   setAppStatus("");
  // };
  

  let colleges = require("./finalColleges.json");

  return (
    <WidgetWrapper>
      <FlexBetween gap="2rem">
        <FormControl fullWidth>
          <Select
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "College" }}
          >
            <MenuItem value="" disabled>
              Select a College/University
            </MenuItem>
            {colleges.map((college) => (
              <MenuItem key={college.UNITID} value={college.INSTNM}>
                {college.INSTNM}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Select
          value={appStatus}
          onChange={(e) => setAppStatus(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Application Status" }}
        >
          <MenuItem value="" disabled>
            Application Status
          </MenuItem>
          <MenuItem value="Applied">Applied</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
          <MenuItem value="Waitlisted">Waitlisted</MenuItem>
          <MenuItem value="Deferred">Deferred</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
      </FlexBetween>

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem"></FlexBetween>

        {isNonMobileScreens ? <></> : <FlexBetween gap="0.25rem"></FlexBetween>}

        <Button
          disabled={!college || !appStatus}
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
