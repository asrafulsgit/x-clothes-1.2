import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import "./Men.css";
import Nav from "../../App/Nav/Nav";
import Footer from "../../App/Footer/Footer";
import mensBanner from "../../../assets/banners/mens-banner.jpg";

import { useParams } from "react-router-dom";
import Card from "../Card";
import Modal from "../Modal";

const Men = () => {
  const { category } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [modalLoading, setModalLoading] = useState(true);
  const [mensData, setMensData] = useState([]);
  useEffect(() => {
    if (category.length === 3) {
      axios
        .post("http://localhost:8000/get-product-by-subcategory", {
          subcategory: category,
        })
        .then((res) => {
          setMensData(res.data.products);
          setPageLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setMensData([]);
        });
    }
    if (category === "101120") {
      axios
        .post("http://localhost:8000/get-product-by-categoris", {
          categories: ["101120"],
        })
        .then((res) => {
          setMensData(res.data.products);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [category]);

  const handleModal = (modal, product) => {
    setIsModal(modal);
    setModalInfo(product);
    setModalLoading(false);
  };
  const clearCartModal = (value) => {
    setIsModal(value);
  };

  return (
    <>
      <div className="mens-page">
        <Nav navBgSetWithModal={isModal && true} />

        <div className="mens-banner">
          <img src={mensBanner} alt="Mens-banner" />
        </div>
        <div className="mens-section">
          {pageLoading ? (
            <p style={{ textAlign: "center" }}>Loaging...</p>
          ) : (
            <div className="mens-shop">
              {!pageLoading && mensData.length <= 0 && <p>Product Empty!</p>}
              {!pageLoading &&
                mensData.length >= 0 &&
                mensData.map((item) => {
                  return (
                    <Card
                      key={uuidv4()}
                      item={item}
                      handleModal={handleModal}
                    />
                  );
                })}
            </div>
          )}
        </div>
        <Footer />
      </div>
      <div className={isModal ? "modal-open" : "add-to-cart-modal"}>
        {!modalLoading && isModal ? (
          <Modal product={modalInfo} clearCartModal={clearCartModal} />
        ) : (
          <p style={{ color: "white" }}>loading...</p>
        )}
      </div>
    </>
  );
};

export default Men;
