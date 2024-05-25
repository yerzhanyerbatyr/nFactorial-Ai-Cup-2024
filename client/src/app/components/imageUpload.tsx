"use client";
import { UploadButton } from "@/utils/uploadthing";
import React, { useState } from "react";
import styles from "./Main.module.css";

const ImageUpload = ({ imageUrl, setImageUrl }) => {
  return (
    <div className={styles.imageUploadContainer}>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          setImageUrl(res[0].url);
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imageUrl ? (
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt="" style={{ maxWidth: "200px", height: "auto" }} />
        </div>
      ) : null}
    </div>
  );
};

const Main = () => {
  const [refImageUrl, setRefImageUrl] = useState("");
  const [removeImageUrl, setRemoveImageUrl] = useState("");

  const handleRemoveClick = () => {
    console.log("Ready and clicked");
  };

  const bothImagesUploaded = refImageUrl && removeImageUrl;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.box}>
            <p>Upload a photo of a person to remove</p>
          <ImageUpload imageUrl={refImageUrl} setImageUrl={setRefImageUrl} />
        </div>
        <div className={styles.box}>
        <p>Upload a photo where to remove</p>
          <ImageUpload imageUrl={removeImageUrl} setImageUrl={setRemoveImageUrl} />
        </div>
      </div>
      <button
        onClick={handleRemoveClick}
        className={styles.removeButton}
        disabled={!bothImagesUploaded}
      >
        Remove
      </button>
    </div>
  );
};

export default Main;