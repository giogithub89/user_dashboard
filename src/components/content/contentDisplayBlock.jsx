import React from "react";
import CellGridCustom from "../gridLayout/CellGridCustom";
import { ImageList, ImageListItem, Typography } from "@mui/material";

const ContentDisplayBlock = ({ media, contentType, htmlContent }) => {
  return (
    <CellGridCustom gridColumn="span 9">
      <Typography variant="h4" fontWeight="bold">
        Contenuto
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>

      <ImageList sx={{ width: "100%" }} cols={3} rowHeight={"30px"}>
        {media
          ? media.map((item, index) => (
              <ImageListItem key={index} sx={{ width: "240px", backgroundPosition: "center" }}>
                {contentType === "image" ? (
                  <img
                    src={`${item.url}`}
                    alt=""
                    //loading="lazy"
                  />
                ) : contentType === "video" ? (
                  <video className="VideoInput_video" width="300px" height="200px" controls src={item.url} />
                ) : contentType === "audio" ? (
                  <audio width="200px" height="100px" controls src={item.url}></audio>
                ) : null}
              </ImageListItem>
            ))
          : null}
      </ImageList>
    </CellGridCustom>
  );
};

export default ContentDisplayBlock;
