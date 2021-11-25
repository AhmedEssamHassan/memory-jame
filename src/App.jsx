import "./App.css";
import { initImages } from "./data";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
var _ = require("lodash");

function App() {
  const [images, setImages] = useState(_.shuffle(initImages));
  const [swap, setSwap] = useState({});

  const handleClick = (index, obj) => {
    swap[index] = obj;
    console.log(swap);
    images[index] = { ...obj, status: true };
    setImages([...images]);
    if (Object.keys(swap).length > 1) {
      if (swap[Object.keys(swap)[0]].src === swap[Object.keys(swap)[1]].src) {
        images[Object.keys(swap)[0]] = {
          ...Object.values(swap)[0],
          status: true,
        };
        images[Object.keys(swap)[1]] = {
          ...Object.values(swap)[1],
          status: true,
        };
        setSwap({});
        setImages([...images]);

        if (!images.some((e) => e.status === false)) {
          setTimeout(() => {
            alert("finished");
          }, 800);
        }
      } else {
        console.log("x");
        images[Object.keys(swap)[0]] = {
          ...Object.values(swap)[0],
          status: false,
        };
        images[Object.keys(swap)[1]] = {
          ...Object.values(swap)[1],
          status: false,
        };

        setTimeout(() => {
          setImages([...images]);
        }, 700);
        setSwap({});
      }
    }
  };

  return (
    <div
      className="App d-flex justify-content-center align-items-center"
      style={{ border: "1px solid red", minHeight: "100vh" }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ width: "60%" }}
      >
        <div
          style={{
            border: "1px solid red",
            position: "absolute",
            top: 0,
            left: 0,
            width: "20%",
            height: "100%",
          }}
        >
          s
        </div>

        {/* ******************* */}
        <div className="d-flex flex-wrap justify-content-center">
          {images.map((img, index) => {
            return (
              <div key={img.id} className={`flip-card ${img.className}`}>
                <div
                  className={`flip-card-inner ${
                    img.status ? "flip-on-click" : ""
                  }`}
                  onClick={() => (img.status ? "" : handleClick(index, img))}
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
