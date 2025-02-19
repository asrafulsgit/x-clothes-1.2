import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./Kids.css";
import Nav from "../../App/Nav/Nav";
import Footer from "../../App/Footer/Footer";
import kidsBanner from "../../../assets/banners/kids-banner.png";
import axios from "axios";

import { useParams } from "react-router-dom";
import Card from "../Card";
import Modal from "../Modal";

const Kids = () => {
  const { category } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [modalLoading, setModalLoading] = useState(true);
  const [kidsData, setKidsData] = useState([]);

  useEffect(() => {
    if (category.length === 3) {
      axios
        .post("http://localhost:8000/get-product-by-subcategory", {
          subcategory: category,
        })
        .then((res) => {
          setKidsData(res.data.products);
          setPageLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setWomensData([]);
        });
    }
    if (category === "304014") {
      axios
        .post("http://localhost:8000/get-product-by-categoris", {
          categories: ["301320", "401420"],
        })
        .then((res) => {
          setKidsData(res.data.products);
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
      <div className="kids-page">
        <Nav navBgSetWithModal={isModal && true} />
        <div className="kids-banner">
          <img src={kidsBanner} alt="Kids-banner" />
        </div>

        <div className="kids-section">
          {pageLoading ? (
            <p style={{ textAlign: "center" }}>Loaging...</p>
          ) : (
            <div className="kids-shop">
              {!pageLoading && womensData.length <= 0 && <p>Product Empty!</p>}
              {!pageLoading &&
                womensData.length >= 0 &&
                womensData.map((item) => {
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

export default Kids;
