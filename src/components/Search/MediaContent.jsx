import React, { useState } from "react";
import {
  Modal,
  IconButton,
  Label,
  PrimaryButton,
  TextField
} from "office-ui-fabric-react";
import { config } from "../../config/config";
import noImage from "../../assets/noimage.PNG";

const MediaContent = (props) => {
  const [rating, setRating] = useState(0);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

  //Function to close the modal on dismiss and close button
  const dismissModal = () => {
    props.onClose(false);
  };

  //Function to set the value of rating Entered
  const onRatingChange = (evt, newValue) => {
    setRating(Number(newValue));
  };

  //Function to submit the rating on Submit button click
  const submitRating = () => {
    const headers = {
      "Content-Type": "application/json;charset=utf-8",
    };
    fetch(
      `${config.BASE_URL_API}/${
        props.data.media_type === "tv" ? `tv` : `movie`
      }/${props.data.id}/rating?api_key=${config.API_KEY}&guest_session_id=${
        config.GUEST_SESSION_ID
      }`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ value: rating }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    setIsRatingSubmitted(true);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onDismiss={dismissModal}
      isBlocking={false}
      containerClassName="mediaContentContainer"
    >
      <div style={{ display: "flex", flexDirection: "column", margin: "2%" }}>
        <IconButton
          style={{ alignSelf: "flex-end", border: "1px solid" }}
          iconProps={{ iconName: "Cancel" }}
          onClick={dismissModal}
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img
            src={
              props.data.poster_path !== null
                ? `${config.BASE_URL_IMGAGES_W185}/${props.data.poster_path}`
                : noImage
            }
            alt={
              props.data.media_type === "tv"
                ? props.data.name
                : props.data.title
            }
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 style={{ textAlign: "left", marginLeft: "2%" }}>
              {props.data.media_type === "tv"
                ? props.data.name
                : props.data.title}
            </h2>
            <p style={{ textAlign: "left", marginLeft: "2%" }}>
              {props.data.media_type === "tv"
                ? props.data.first_air_date
                : props.data.release_date}
            </p>
            <p style={{ textAlign: "left", marginLeft: "2%" }}>
              {props.data.overview}
            </p>
            <div
              style={{ display: "flex", flexDirection: "row", margin: "2%" }}
            >
              <Label>Rating </Label>
              <TextField
                className="ratingTextField"
                onChange={onRatingChange}
                type="number"
                style={{ width: "50%", marginLeft: "1%" }}
              />
              {isRatingSubmitted ? (
                <span style={{ marginTop: "5%", fontWeight: "bold" }}>
                  Submitted !!
                </span>
              ) : (
                <PrimaryButton
                  text="Submit"
                  onClick={submitRating}
                  style={{ marginLeft: "1%" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MediaContent;
