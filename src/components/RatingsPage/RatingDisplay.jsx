import React from "react";
import { config } from "../../config/config";
import noImage from "../../assets/noimage.PNG";

const RatingsDisplay = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "40%",
        padding: "0.5%",
        margin: "1%",
        justifyContent: "space-between",
        boxShadow:
          "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
      }}
    >
      <img
        style={{ width: "50%" }}
        src={
          props.details.poster_path !== null
            ? `${config.BASE_URL_IMGAGES_W92}/${props.details.poster_path}`
            : noImage
        }
        alt={props.details.title}
      />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <h2 style={{ textAlign: "left", marginLeft: "2%" }}>
          {props.details.title}
        </h2>
        <p style={{ textAlign: "left", marginLeft: "2%" }}>
          {props.details.release_date}
        </p>
        <p style={{ textAlign: "left", marginLeft: "2%" }}>
          {props.details.overview}
        </p>
        <p style={{ marginLeft: "2%" }}>Rating : {props.details.rating}</p>
      </div>
    </div>
  );
};

export default RatingsDisplay;
