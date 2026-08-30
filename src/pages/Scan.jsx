import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  ScanLine,
  Camera,
  Upload,
  ShoppingCart,
  CheckCircle2,
  X,
  ArrowRight,
  Tag,
} from "lucide-react";

import { Html5Qrcode } from "html5-qrcode";

import { useWishlist } from "./WishListContext";

import "./Scan.css";


/* =========================================================
   DEMO PRODUCTS
========================================================= */

const products = {

  "8901234567890": {
    id: "medicine-paracetamol-650",
    name: "Paracetamol 650mg",
    category: "Pain Relief",
    description: "Strip of 10 tablets",
    price: 30,
    mrp: 38,
    discount: "21% OFF",
    rating: 4.7,
    reviews: 124,

    stores: [
      {
        name: "OneBasket Pharmacy",
        price: 30,
      },
      {
        name: "Health Store",
        price: 34,
      },
      {
        name: "MediCare",
        price: 38,
      },
    ],
  },


  "8901234567891": {
    id: "medicine-dolo-650",
    name: "Dolo 650",
    category: "Pain Relief",
    description: "Strip of 15 tablets",
    price: 30,
    mrp: 38,
    discount: "21% OFF",
    rating: 4.8,
    reviews: 210,

    stores: [
      {
        name: "OneBasket Pharmacy",
        price: 30,
      },
      {
        name: "MediCare",
        price: 33,
      },
      {
        name: "Health Store",
        price: 38,
      },
    ],
  },


  "8901234567892": {
    id: "grocery-milk",
    name: "Fresh Milk",
    category: "Grocery",
    description: "1 litre pack",
    price: 58,
    mrp: 65,
    discount: "11% OFF",
    rating: 4.6,
    reviews: 98,

    stores: [
      {
        name: "Fresh Mart",
        price: 58,
      },
      {
        name: "Daily Needs",
        price: 60,
      },
      {
        name: "Super Store",
        price: 65,
      },
    ],
  },

};


/* =========================================================
   DEFAULT DEMO PRODUCT
========================================================= */

const defaultProduct =
  products["8901234567890"];


/* =========================================================
   SCAN COMPONENT
========================================================= */

function Scan() {

  /* =======================================================
     CAMERA REFERENCES
  ======================================================= */

  const videoRef = useRef(null);

  const streamRef = useRef(null);

  const scannerRef = useRef(null);

  const scannerInstance = useRef(null);

  const fileInputRef = useRef(null);


  /* =======================================================
     STATES
  ======================================================= */

  const [scannerOpen, setScannerOpen] =
    useState(false);

  const [scanning, setScanning] =
    useState(false);

  const [cameraOpen, setCameraOpen] =
    useState(false);

  const [capturedImage, setCapturedImage] =
    useState(null);

  const [product, setProduct] =
    useState(null);

  const [uploadedImage, setUploadedImage] =
    useState(null);

  const [message, setMessage] =
    useState("");


  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();


  /* =========================================================
     OPEN TAKE PHOTO CAMERA
  ========================================================= */

  const openCamera = async () => {

    try {

      setMessage("");

      setProduct(null);

      setCameraOpen(true);


      const stream =
        await navigator.mediaDevices.getUserMedia({

          video: {
            facingMode: "environment",
          },

          audio: false,

        });


      streamRef.current = stream;


      /*
        Wait until React renders
        the <video> element.
      */

      setTimeout(() => {

        if (videoRef.current) {

          videoRef.current.srcObject =
            stream;

          videoRef.current
            .play()
            .catch(() => {});

        }

      }, 100);


    } catch (error) {

      console.error(
        "Camera error:",
        error
      );

      setCameraOpen(false);

      alert(
        "Camera could not be opened. Please allow camera permission in your browser."
      );

    }

  };


  /* =========================================================
     CLOSE TAKE PHOTO CAMERA
  ========================================================= */

  const closeCamera = () => {

    if (streamRef.current) {

      streamRef.current
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      streamRef.current = null;

    }


    if (videoRef.current) {

      videoRef.current.srcObject =
        null;

    }


    setCameraOpen(false);

  };


  /* =========================================================
     CAPTURE PHOTO FROM CAMERA
  ========================================================= */

  const capturePhoto = () => {

    if (!videoRef.current) {
      return;
    }


    const video =
      videoRef.current;


    if (
      !video.videoWidth ||
      !video.videoHeight
    ) {

      alert(
        "Camera is not ready yet. Please wait a moment."
      );

      return;

    }


    const canvas =
      document.createElement("canvas");


    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;


    const context =
      canvas.getContext("2d");


    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );


    const image =
      canvas.toDataURL(
        "image/jpeg",
        0.9
      );


    setCapturedImage(image);

    setUploadedImage(image);

    closeCamera();


    setProduct(null);

    setMessage(
      "Photo captured. Identifying product..."
    );

    setScanning(true);


    /*
      Demo product identification.
      Later this can be connected
      to real AI/product recognition.
    */

    setTimeout(() => {

      setScanning(false);

      setProduct(
        defaultProduct
      );

      setMessage(
        "Product identified successfully!"
      );

    }, 1200);

  };


  /* =========================================================
     START QR / BARCODE SCANNER
  ========================================================= */

  const startScanner = async () => {

    setProduct(null);

    setMessage("");

    setScannerOpen(true);

    setScanning(true);


    setTimeout(async () => {

      try {

        if (
          !document.getElementById(
            "barcode-reader"
          )
        ) {
          return;
        }


        const scanner =
          new Html5Qrcode(
            "barcode-reader"
          );


        scannerInstance.current =
          scanner;


        await scanner.start(

          {
            facingMode: "environment",
          },

          {
            fps: 10,

            qrbox: {
              width: 250,
              height: 160,
            },

          },

          async (decodedText) => {

            console.log(
              "Scanned:",
              decodedText
            );


            await stopScanner();


            const foundProduct =
              products[decodedText];


            if (foundProduct) {

              setProduct(
                foundProduct
              );

              setMessage(
                "Product found successfully!"
              );

            } else {

              /*
                Demo fallback
              */

              setProduct(
                defaultProduct
              );

              setMessage(
                `Barcode detected: ${decodedText}`
              );

            }

          },

          () => {
            // Ignore continuous scanner errors.
          }

        );

      } catch (error) {

        console.error(
          "Scanner error:",
          error
        );

        setScanning(false);

        setScannerOpen(false);

        setMessage(
          "Camera could not be opened. Please allow camera access."
        );

      }

    }, 150);

  };


  /* =========================================================
     STOP QR / BARCODE SCANNER
  ========================================================= */

  const stopScanner = async () => {

    try {

      if (
        scannerInstance.current
      ) {

        const scanner =
          scannerInstance.current;


        if (
          scanner.isScanning
        ) {

          await scanner.stop();

        }


        await scanner.clear();

        scannerInstance.current =
          null;

      }

    } catch (error) {

      console.error(
        "Stopping scanner:",
        error
      );

    }


    setScanning(false);

    setScannerOpen(false);

  };
  const handleUpload = (
    event
  ) => {

    const file =
      event.target.files?.[0];


    if (!file) {
      return;
    }


    const imageUrl =
      URL.createObjectURL(file);


    setUploadedImage(
      imageUrl
    );

    setCapturedImage(
      null
    );

    setProduct(null);

    setMessage(
      "Image uploaded. Identifying product..."
    );

    setScanning(true);


    setTimeout(() => {

      setScanning(false);

      setProduct(
        defaultProduct
      );

      setMessage(
        "Product identified from image!"
      );

    }, 1200);

  };
  const clearScan = async () => {

    await stopScanner();

    closeCamera();


    setProduct(null);

    setUploadedImage(null);

    setCapturedImage(null);

    setMessage("");

    setScanning(false);


    if (
      fileInputRef.current
    ) {

      fileInputRef.current.value =
        "";

    }

  };

  useEffect(() => {

    return () => {

      if (streamRef.current) {

        streamRef.current
          .getTracks()
          .forEach((track) => {
            track.stop();
          });

      }
      if (
        scannerInstance.current
      ) {

        scannerInstance.current
          .stop()
          .catch(() => {});

      }

    };

  }, []);
  const bestPrice =
    product
      ? Math.min(
          ...product.stores.map(
            (store) =>
              store.price
          )
        )
      : 0;

  return (

    <div className="scan-page">

      <section className="scan-header">

        <div className="scan-header-icon">

          <ScanLine size={30} />

        </div>


        <div>

          <p>
            ONEBASKET SMART SCAN
          </p>

          <h1>
            Scan a product
          </h1>

          <span>
            Scan, snap or upload — find
            the best price instantly.
          </span>

        </div>

      </section>

      {!product && (

        <section className="scanner-card">

          {scannerOpen ? (

            <div className="real-scanner-wrapper">

              <div
                id="barcode-reader"
                ref={scannerRef}
                className="barcode-reader"
              />


              <div className="scanner-status">

                {scanning ? (

                  <>
                    <span className="status-dot" />

                    Point your camera at a
                    QR code or barcode
                  </>

                ) : (

                  message

                )}

              </div>


              <button
                type="button"
                className="stop-scan-button"
                onClick={stopScanner}
              >

                <X size={18} />

                Stop Scanner

              </button>

            </div>

          ) : (

            <div className="scanner-view">

              <div className="scanner-corner top-left" />

              <div className="scanner-corner top-right" />

              <div className="scanner-corner bottom-left" />

              <div className="scanner-corner bottom-right" />


              <div className="scanner-center">

                <ScanLine size={55} />

                <h2>
                  Scan QR or Barcode
                </h2>

                <p>
                  Scan a product to compare
                  its price
                </p>

              </div>

            </div>

          )}
          {message &&
            !scannerOpen && (

            <div className="scan-status">

              {scanning ? (

                <span className="loading-dot">
                  ●
                </span>

              ) : (

                <CheckCircle2
                  size={16}
                />

              )}

              {message}

            </div>

          )}
          <div className="scan-options">
                        <button
              type="button"
              className="scan-option primary"
              onClick={
                scannerOpen
                  ? stopScanner
                  : startScanner
              }
              disabled={
                cameraOpen
              }
            >

              <div className="scan-option-icon">

                <ScanLine
                  size={23}
                />

              </div>


              <div>

                <strong>

                  {scannerOpen
                    ? "Stop Scanner"
                    : "Scan QR / Barcode"}

                </strong>

                <span>

                  {scannerOpen
                    ? "Close camera"
                    : "Use laptop camera"}

                </span>

              </div>

            </button>
    <button
              type="button"
              className="scan-option"
              onClick={openCamera}
              disabled={
                scannerOpen
              }
            >

              <div className="scan-option-icon">

                <Camera
                  size={23}
                />

              </div>


              <div>

                <strong>
                  Take Photo
                </strong>

                <span>
                  Open your camera
                </span>

              </div>

            </button>
            <button
              type="button"
              className="scan-option"
              onClick={() =>
                fileInputRef
                  .current
                  ?.click()
              }
              disabled={
                scannerOpen ||
                cameraOpen
              }
            >

              <div className="scan-option-icon">

                <Upload
                  size={23}
                />

              </div>


              <div>

                <strong>
                  Upload Photo
                </strong>

                <span>
                  Choose from device
                </span>

              </div>

            </button>

          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={
              handleUpload
            }
            hidden
          />


          <p className="scan-note">

            🔒 Your uploaded images are
            used only to identify products.

          </p>

        </section>

      )}
  {cameraOpen && (

        <div className="camera-overlay">

          <div className="camera-modal">


            {/* CAMERA HEADER */}

            <div className="camera-header">

              <div>

                <p>
                  PRODUCT CAMERA
                </p>

                <h2>
                  Take a Photo
                </h2>

              </div>


              <button
                type="button"
                className="camera-close"
                onClick={
                  closeCamera
                }
                aria-label="Close camera"
              >

                <X size={20} />

              </button>

            </div>


            {/* LIVE CAMERA */}

            <div className="camera-preview">

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
              />


              {/* CAMERA FRAME */}

              <div className="camera-frame">

                <span />
                <span />
                <span />
                <span />

              </div>

            </div>


            <p className="camera-hint">

              Position the product inside
              the frame

            </p>


            {/* CAPTURE */}

            <button
              type="button"
              className="capture-button"
              onClick={
                capturePhoto
              }
            >

              <Camera size={22} />

              Capture Photo

            </button>

          </div>

        </div>

      )}
      {capturedImage &&
        !cameraOpen &&
        !product && (

        <div className="captured-result">

          <div className="captured-image-wrapper">

            <img
              src={capturedImage}
              alt="Captured product"
            />

          </div>


          <div className="captured-info">

            <span>
              PHOTO CAPTURED ✓
            </span>

            <h3>
              Product photo ready
            </h3>

            <p>
              Your product image has been
              captured and is being identified.
            </p>


            <button
              type="button"
              onClick={
                openCamera
              }
            >

              <Camera size={14} />

              Retake Photo

            </button>

          </div>

        </div>

      )}
{product && (

        <section className="scan-result-card">


          {/* RESULT HEADER */}

          <div className="result-heading">

            <div>

              <p>
                PRODUCT FOUND
              </p>

              <h2>
                {product.name}
              </h2>

              <span>

                {product.category}
                {" • "}
                {product.description}

              </span>

            </div>


            <button
              type="button"
              className="close-scan"
              onClick={
                clearScan
              }
              aria-label="Scan another product"
            >

              <X size={20} />

            </button>

          </div>
          <div className="scan-product-info">


            <div className="scan-product-image">

              {uploadedImage ? (

                <img
                  src={uploadedImage}
                  alt={product.name}
                />

              ) : (

                <span>

                  {product.category ===
                  "Grocery"
                    ? "🛒"
                    : "💊"}

                </span>

              )}

            </div>


            <div className="scan-product-details">

              <div className="scan-rating">

                <span>
                  ★
                </span>

                <strong>
                  {product.rating}
                </strong>

                <small>
                  ({product.reviews} reviews)
                </small>

              </div>


              <div className="scan-main-price">

                <strong>
                  ₹{product.price}
                </strong>

                <del>
                  ₹{product.mrp}
                </del>

                <span>
                  {product.discount}
                </span>

              </div>

            </div>

          </div>
          <div className="best-price-box">

            <div className="best-price-icon">

              <Tag size={21} />

            </div>


            <div>

              <span>
                BEST PRICE FOUND
              </span>

              <strong>
                ₹{bestPrice}
              </strong>

            </div>


            <CheckCircle2
              size={23}
            />

          </div>


          {/* STORE COMPARISON */}

          <div className="store-comparison">

            <h3>
              Compare prices
            </h3>


            {product.stores.map(
              (store) => (

              <div
                className={
                  `store-row ${
                    store.price ===
                    bestPrice
                      ? "best-store"
                      : ""
                  }`
                }
                key={
                  store.name
                }
              >

                <div>

                  <strong>
                    {store.name}
                  </strong>


                  {store.price ===
                    bestPrice && (

                    <span>
                      BEST PRICE
                    </span>

                  )}

                </div>


                <strong>
                  ₹{store.price}
                </strong>

              </div>

            ))}

          </div>
          <div className="scan-actions">

            <button
              type="button"
              onClick={
                clearScan
              }
            >

              📷 Scan QR / Barcode

            </button>


            <Link
              to="/cart"
              className="scan-cart"
            >

              <ShoppingCart
                size={18}
              />

              Add to Cart

            </Link>


            <Link
              to="/compare"
              className="scan-compare"
            >

              Compare Prices

              <ArrowRight
                size={17}
              />

            </Link>

          </div>
           <button
            type="button"
            className="scan-again"
            onClick={
              clearScan
            }
          >

            <ScanLine size={17} />

            Scan another product

          </button>

        </section>

      )}

    </div>

  );

}


export default Scan;