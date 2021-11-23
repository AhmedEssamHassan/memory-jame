import "./App.css";
import { initImages } from "./data";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
var _ = require("lodash");

function App() {
  const [images, setImages] = useState([]);
  const [keys, setKeys] = useState([]);
  const [result, setResult] = useState("success");
  const [similar, setSimilar] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [clickedItem, setClickedItem] = useState("");
  useEffect(() => {
    setImages(_.shuffle(initImages));
  }, []);

  const handleClick = (obj) => {
    setClickedItem(obj.id);
    if (obj.id !== clickedItem) {
      setSelectedItems([...selectedItems, obj]);
      obj.className = "flip-on-click";
      const newImages = images.filter((img) => img.id !== obj.id);
      newImages.splice(obj.index, 0, obj);
      setImages(newImages);
      /* **************** */
      if (keys.length < 2) {
        setKeys([...keys, obj.key]);
      } else {
        setKeys([obj.key]);
      }
    }
  };

  useEffect(() => {
    if (keys[0] === keys[1]) {
      const theKey = keys[0];
      const similaritems = images
        .filter((item) => item.key === theKey)
        .map((item) => (item.className = "flip-on-click"));
      setSimilar([...similar, ...similaritems]);
      setResult("success");
      setSelectedItems([]);
    } else {
      if (keys.length === 2) {
        const hiddenImages = selectedItems.map((item) => {
          return { ...item, className: "" };
        });

        const firstIndex = hiddenImages[0].index;
        const secIndex = hiddenImages[1].index;

        const updatedImages = [...images];
        updatedImages[firstIndex] = {
          ...updatedImages[firstIndex],
          className: "xx",
        };
        updatedImages[secIndex] = {
          ...updatedImages[secIndex],
          className: "xx",
        };
        setTimeout(() => {
          setImages(updatedImages);
        }, 1000);
        setKeys([]);
      }
      setResult("faild");
    }
  }, [keys]);

  return (
    <div className="App d-flex justify-content-center">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ width: "60%" }}
      >
        <div>{result}</div>

        {/* ******************* */}
        <div className="d-flex flex-wrap justify-content-center">
          {images.map((img, index) => {
            return (
              <div key={img.id} className={`flip-card ${img.className}`}>
                <div
                  className={`flip-card-inner ${img.className}`}
                  onClick={() => {
                    handleClick({ ...img, index });
                  }}
                >
                  <div className="flip-card-front"></div>
                  <div className="flip-card-back">
                    <img
                      style={{ width: "150px", height: 150 }}
                      src={img.src}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

/* 
 images[obj.index] = { ...obj, className: "flip-on-click" };
    setImages([...images]);

    setKeys((oldObj) => {
      if (oldObj?.key === obj?.key) {
        images[obj.index] = { ...obj, className: "flip-on-click" };
        images[oldObj.index] = { ...oldObj, className: "flip-on-click" };
      } else {
      }

      return obj;
    });
 */
