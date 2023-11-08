import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Header/header.css";

const API_KEY = process.env.REACT_APP_KEY;

const FlickrImages = (props) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const fetchImages = async (text, page) => {
    try {
      const response = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${text}&page=${page}&format=json&nojsoncallback=1`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.photos && data.photos.photo) {
          setImages((prevImages) => [...prevImages, ...data.photos.photo]);
          setPage(page + 1);
        }
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  useEffect(() => {
    setImages([]);
    setPage(1);
    fetchImages(props.text, 1);
  }, [props.text]);

  return (
    <div>
      <InfiniteScroll
        dataLength={images.length}
        next={() => fetchImages(props.text, 1)}
        hasMore={true}
      >
        <div className="image-container">
          {images.map((image) => (
            <img
              key={image.id}
              src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
              alt={image.title}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default FlickrImages;
