import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./modal.css";

const Modal = ({ product,clearCartModal }) => {
  const [productInfo, setProduct] = useState(product);
  const [modalThunailImage, setModalthumnailImage] = useState(
    product.images[0]
  );
     const [quantity, setQuantity] = useState(1);
     const [selectedSize, setSelectedSize] = useState("");
     
  const { _id, brand, title, price, sizes, images, description } = productInfo;
  const [cartInfo, setCartInfo] = useState({
    productId: _id,
    quantity: 1,
    color: "",
    size: "",
  });
  const hangleThumnailImage = (index) => {
    setModalthumnailImage(product.images[index]);
  };
  const handleSize = (e) => {
     setSelectedSize(e.target.value);
   };
   const handleQuantity = (e) => {
     const { value } = e.target;
     setQuantity(Number(value));
   };
   const handleColor=(e)=>{
      const color = e.target.value;
 
   }
   const handleModal=()=>{
     clearCartModal(false)
   }
  return (
    <div className="cart-modal">
      <div onClick={handleModal} className="modal-close-btn">
          <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="cart-modal-left">
        <div className="cart-modal-images">
          {images.map((img, index) => {
            return (
              <img
                src={img}
                onClick={() => hangleThumnailImage(index)}
                onMouseOver={() => hangleThumnailImage(index)}
                key={index}
                alt=""
              />
            );
          })}
        </div>
        <div className="cart-modal-thumnail-image">
          <img src={modalThunailImage || "somthing wrong"} alt="" />
        </div>
      </div>
      <div className="cart-modal-right">
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
                onClick={() => setQuantity(quantity - 1)}
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
                onClick={() => setQuantity(quantity + 1)}
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
        <div className="colors-div">
          <p>Colors : </p>
          <div className="colors">
          {product.colors.map((item, index) => {
            return (
              <input
                key={index}
                onClick={handleColor}
                type="button"
                value={item}
                className="color"
              />
            );
          })}
          </div>
        </div>
        <div className="cart-modal-btns">
          <button
            className="add-to-cart"
            onClick={() => alert("Sorry this app is no longer usable")}
          >
            <a>Add To Cart</a>
          </button>
          <button className="cart-modal-favorite-btn">
               <i className="fa-regular fa-heart"></i>
          </button>
        </div>
        <div className="description">
          <h3>Description : </h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
