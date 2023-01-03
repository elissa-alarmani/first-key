import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCollegeApps } from "state";
import CollegeAppWidget from "./CollegeAppWidget";

const CollegeAppsWidget = ({userId }) => {
  const dispatch = useDispatch();
  const collegeApps = useSelector((state) => state.collegeApps);
  const token = useSelector((state) => state.token);

  const getCollegApps = async () => {
    const response = await fetch(
      `http://localhost:3001/collegeApps/${userId}/collegeApps`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(token);
    console.log(userId);
    dispatch(setCollegeApps({ collegeApps: data }));
  };

  


  useEffect(() => {
      getCollegApps();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {collegeApps && collegeApps.length > 0 && collegeApps.map(
        ({
          _id,
          userId,
          college,
          appStatus,
          
         
        }) => (
          <CollegeAppWidget
            key={_id}
            collegeAppId={_id}
            collegeAppUserId={userId}
            college={college}
            appStatus={appStatus}
            
          />
        )
      )}
    </>
  );
        };  

export default CollegeAppsWidget;