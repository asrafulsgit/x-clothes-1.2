import React, { memo, useEffect, useState } from "react";

// magnifier
import ReactImageMagnify from "react-image-magnify";
import ImageMagnify from "./ImageMagnify";

import "./Productinfo.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

import Nav from "../../App/Nav/Nav";
import Footer from "../../App/Footer/Footer";

const Productinfo = React.memo(() => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { brand, title, price, sizes, images, description } = product;
  const [thumbImage, setThumbImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8000/get-one-product", { id })
      .then((res) => {
        const { images } = res.data.product;
        setIsLoading(false);
        setProduct(res.data.product);
        setThumbImage(images[0]);
      })
      .catch((err) => {
        setIsLoading(false);
        setMessage(err.response.data.message);
      });
  }, [id]);
  const handleSize = (e) => {
    setSelectedSize(e.target.value);
  };
  const handleQuantity = (e) => {
    const { value } = e.target;
    setQuantity(value);
  };
  return (
    <div>
      <Nav />
      {isLoading ? (
        <div className="product-info-loader">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="product-info-page">
          <div className="product-info">
            <div className="info-left">
              <div className="variants">
                {images.map((item, i) => {
                  return (
                    <div key={i} className="variant-image">
                      <img
                        loading="lazy"
                        onClick={(e) => setThumbImage(e.target.src)}
                        src={item}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
              <div className="thumb-image">
              <ImageMagnify
                  smallImage={{
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: thumbImage,
                  }}
                  largeImage={{
                    src: thumbImage,
                    width: 1800,
                    height: 2167,
                  }}
              />
              </div>
            </div>
            <div className="info-right">
              <div>
                <h3 className="product-brand">{brand}</h3>
                <h3 className="product-title">{title}</h3>
              </div>
              <div className="product-price">
                <p className="price">TK : {price}</p>
              </div>
              <div className="size_quantity">
                <div className="quentity-div">
                  <p>Quantity : </p>
                  <div className="quantity-field">
                    <button
                      onClick={() => setQuantity((prev) => prev - 1)}
                      disabled={quantity === 1}
                      className="inc-dec-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      onChange={handleQuantity}
                      value={quantity}
                      name="quantity"
                      id="quantity"
                    />
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="inc-dec-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                {sizes && (
                  <div className="product-size">
                    <p>Size : </p>
                    <select
                      name="sizes"
                      value={selectedSize}
                      id="sizes"
                      onChange={handleSize}
                    >
                      {sizes.map((item) => (
                        <option key={uuidv4()} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="add-to-cart-btns">
                <button
                  className="add-to-cart"
                  onClick={() => alert("Sorry this app is no longer usable")}
                >
                  <a>Add To Cart</a>
                </button>
              </div>
              <div className="description">
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
});

export default Productinfo;
