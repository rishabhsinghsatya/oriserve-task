import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_KEY;

const FlickrImages = (props) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${props.text}&format=json&nojsoncallback=1`
        );

        if (
          response.data &&
          response.data.photos &&
          response.data.photos.photo
        ) {
          setImages(response.data.photos.photo);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{props.text}</h1>
      <div className="image-container">
        {images.map((image) => (
          <img
            key={image.id}
            src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
            alt={image.title}
          />
        ))}
      </div>
    </div>
  );
};

export default FlickrImages;
