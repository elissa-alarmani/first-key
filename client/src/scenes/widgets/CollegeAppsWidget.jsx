import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCollegeApps } from "state";
import CollegeAppWidget from "./CollegeAppWidget";

const CollegeAppsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const collegeApps = useSelector((state) => state.collegeApps);
  const token = useSelector((state) => state.token);

  const getCollegApps = async () => {
    const response = await fetch("http://localhost:3001/collegeApps", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setCollegeApps({ collegeApps: data }));
  };

  const getUserCollegeApps = async () => {
    const response = await fetch(
      `http://localhost:3001/collegeApps/${userId}/collegeApps`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setCollegeApps({ collegeApps: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserCollegeApps();
    } else {
      getCollegApps();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {collegeApps.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
         
        }) => (
          <CollegeAppWidget
            key={_id}
            collegeAppId={_id}
            collegeAppUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            
          />
        )
      )}
    </>
  );
};

export default CollegeAppsWidget;