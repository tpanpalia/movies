import React, { useState, useEffect } from "react";
import { config } from "../../config/config";
import RatingsDisplay from "./RatingDisplay";

const MyRatings = (props) => {
  const [ratingDetails, setRatingDetails] = useState(null);

  //Fetching the data for My Ratings page
  useEffect(() => {
    let url = `${config.BASE_URL_API}/guest_session/${config.GUEST_SESSION_ID}/rated/movies?api_key=${config.API_KEY}&language=en-US&sort_by=created_at.asc`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setRatingDetails(data.results));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {ratingDetails !== null &&
        ratingDetails !== undefined &&
        ratingDetails.map((item) => {
          return <RatingsDisplay details={item} />;
        })}
    </div>
  );
};

export default MyRatings;
