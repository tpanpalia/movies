import React, { useEffect, useState } from "react";
import { config } from "../../config/config";
import {
  TextField,
  Pivot,
  PivotItem,
  IconButton,
} from "office-ui-fabric-react";
import MovieDisplay from "./MovieDisplay";
import TvShowDisplay from "./TvShowsDisplay";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [textFieldText, settextFieldText] = useState("");
  const [searchedList, setSearchedList] = useState(null);
  const [displaySearchResults, setdisplaySearchResults] = useState(false);
  const [pivotSelected, setPivotSelected] = useState("Movies");

  //Fetching the search result data
  useEffect(() => {
    let url = `${config.BASE_URL_API}/search/multi?api_key=${config.API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setSearchedList(data.results));
  }, [searchText]);

  //Storing the value to be searched on 'onChange' event
  const handleTextChange = (e, newValue) => {
    settextFieldText(newValue);
  };

  //Function to handle Search button clicks
  const onSearchButtonClick = () => {
    setSearchText(textFieldText);
    setdisplaySearchResults(true);
  };

  //Function to handle the state of Pivot change
  const handleState = (item) => {
    setPivotSelected(item.props.headerText);
  };

  //Function to get the count in Pivot element
  const getCount = (type) => {
    if (searchedList !== null && searchedList !== undefined) {
      if (type === "Movies") {
        return searchedList.filter((x) => x.media_type === "movie").length;
      }
      if (type === "TV Shows") {
        return searchedList.filter((x) => x.media_type === "tv").length;
      }
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginTop: "2%",
          justifyContent: "center",
        }}
      >
        <div
          className="search"
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField value={textFieldText} onChange={handleTextChange} />
          <IconButton
            iconProps={{ iconName: "Search" }}
            style={{ backgroundColor: "#032541", color: "white" }}
            onClick={onSearchButtonClick}
          />
        </div>
      </div>

      {displaySearchResults && (
        <Pivot style={{ textAlign: "center" }} onLinkClick={handleState}>
          <PivotItem headerText="Movies" itemCount={getCount("Movies")} />
          <PivotItem headerText="TV Shows" itemCount={getCount("TV Shows")} />
        </Pivot>
      )}

      {searchedList !== null &&
        searchedList !== undefined &&
        displaySearchResults &&
        pivotSelected === "Movies" && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              margin: "1%",
            }}
          >
            {searchedList.map((item) => {
              if (item.media_type === "movie") {
                return <MovieDisplay key={item.id} details={item} />;
              }
              return null;
            })}
          </div>
        )}

      {searchedList !== null &&
        searchedList !== undefined &&
        displaySearchResults &&
        pivotSelected === "TV Shows" && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              margin: "1%",
            }}
          >
            {searchedList.map((item) => {
              if (item.media_type === "tv") {
                return <TvShowDisplay key={item.id} details={item} />;
              }
              return null;
            })}
          </div>
        )}
    </>
  );
};

export default Search;
