import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./ImagesWrapper.css";
import Zoom from "react-img-hover-zoom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useWindowDimensions from "../../helpers/CustomHooks/useWindowDimensions"

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ImagesWrapper = ({ simage, images }) => {
  const [image, setImage] = useState(simage);
  const [openModal, setOpenModal] = useState(false);
  const {width} = useWindowDimensions()

  useEffect(() => {
    if (simage) {
      setImage(simage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <div className="shopx_images_wrapper">
      <div className="shopx_all_images">
        {images?.map((img) => {
          return (
            img?.view !== image?.view &&
            img?.src && (
              <img alt = {img?.src} src={img?.src} onClick={() => setImage(img?.src)} />
            )
          );
        })}
      </div>
      <img
        alt = {image}
        className="shopx_images_wrapper_banner"
        src={image}
        onClick={() => setOpenModal(true)}
      />
      {openModal && (
        <Modal
          isOpen={openModal}
          onRequestClose={() => setOpenModal(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{ position: "relative" }}>
            <p
              style={{
                position: "absolute",
                top: [width > 750 ? "2px" : "10px"],
                right: [width > 750 ? "2px" : "10px"],
                fontSize: "18px",
                zIndex: 5,
                cursor: "pointer",
              }}
              onClick={() => setOpenModal(false)}
            >
              <AiOutlineCloseCircle />
            </p>
            <Zoom
              img={image}
              zoomScale={2}
              width={width > 750 ? 500 : 400}
              height={width > 750 ? 500 : 400}
              className="shopx_modal_img"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImagesWrapper;
