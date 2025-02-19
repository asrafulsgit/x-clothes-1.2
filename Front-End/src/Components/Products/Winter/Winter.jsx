import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./Winter.css";
import Nav from "../../App/Nav/Nav";
import Footer from "../../App/Footer/Footer";
import womensBanner from "../../../assets/banners/winter-banner.png";
import Card from "../Card";
import Modal from "../Modal";
import { categoryCheck, subCategory } from "../../../utils/categoryCheck";
import {apiRequiest} from "../../../utils/ApiCall";

const Winter = () => {
  const { category } = useParams();
    const [message,setMessage]=useState(localStorage.getItem('message')|| 'Product Empty!')
  
  const [pageLoading, setPageLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [modalLoading, setModalLoading] = useState(true);
  const [winterData, setWinterData] = useState([]);

  useEffect(() => {
    const apiCaling = async () => {
      try {
        if (subCategory(category)) {
          const data = await apiRequiest(
            "post",
            "/get-product-by-subcategory",
            { subcategory: category }
          );
          setWinterData(data?.products);
          setPageLoading(false);
        } else if (categoryCheck(category)) {
          const data = await apiRequiest("post", `/get-product-by-categoris`, {
            categories: ["120130","230240","330340","420440"],
          });
          setWinterData(data?.products);
          setPageLoading(false)
        } else {
          setWinterData([]);
          setPageLoading(false)
        }
      } catch (error) {
        console.log(error);
      }
    };
    apiCaling();
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
      <div className="womens-page">
        <Nav navBgSetWithModal={isModal && true} />
        <div className="womens-banner">
          <img src={womensBanner} alt="womens-banner" />
        </div>
        <div className="womens-section">
            {pageLoading ? (
              <p style={{ textAlign: "center" }}>Loaging...</p>
            ) : (
              <div className="womens-shop">
                {!pageLoading && (winterData?.length <= 0 || !winterData) ? (
                  <p>{message}</p>
                ): winterData.map((item) => {
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

export default Winter;
