import React, { useState } from "react";
import "../../assets/styles.css";
import MediaContent from "./MediaContent";
import { config } from "../../config/config";
import noImage from "../../assets/noimage.PNG";

const MovieDisplay = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Function to display modal with media details on div click
  const handleDivClick = () => {
    setIsModalOpen(true);
  };

  //Function to close the modal
  const handleCloseModal = (isCLose) => {
    setIsModalOpen(isCLose);
  };

  return (
    <>
      {isModalOpen && (
        <MediaContent
          isOpen={isModalOpen}
          data={props.details}
          onClose={handleCloseModal}
          guestSessionId={props.guestSessionId}
        />
      )}
      <div
        className="mediaContainer"
        onClick={handleDivClick}
        style={{
          width: "10%",
          textAlign: "center",
          margin: "1%",
          justifyContent: "center",
          padding: "0.5%",
          boxShadow:
            "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
        }}
      >
        <img
          src={
            props.details.poster_path !== null
              ? `${config.BASE_URL_IMGAGES_W92}/${props.details.poster_path}`
              : noImage
          }
          alt={props.details.title}
        />
        <p>{props.details.title}</p>
      </div>
    </>
  );
};

export default MovieDisplay;
