"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInputRef = useRef();

  const handlePickImage = () => {
    const filePicker = imageInputRef.current;
    if (filePicker) {
      filePicker.click(); // Trigger the file input click to open the file picker dialog
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      console.error("No file selected");
      return; // Exit if no file is selected
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPickedImage(reader.result); // Set the picked image data
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <>
      <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
          <div className={classes.preview}>
            {pickedImage ? (
              <Image src={pickedImage} alt="Picked" fill />
            ) : (
              <p>No image picked yet.</p>
            )}
          </div>
          <input
            className={classes.input}
            ref={imageInputRef}
            type="file"
            id={name}
            name={name}
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
          />
          <button
            className={classes.button}
            type="button"
            onClick={handlePickImage}
          >
            Pick an Image
          </button>
        </div>
      </div>
    </>
  );
}
