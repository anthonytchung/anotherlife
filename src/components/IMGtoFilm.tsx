"use client";
import React, { useState } from "react";
import Image from "next/image";
import {Rnd} from "react-rnd"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PictureTab from "./pictureTab"
import UploadTab from "./uploadTab"
import Draggable from "react-draggable";

export default function IMGtoFilm() {
  const dragRef = React.useRef(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("convert"); // Default active tab
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId); // Update the active tab
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically trigger the file input click
    }
  };

  return (
    // <Draggable bounds="parent" nodeRef={dragRef} offsetParent={document.body} handle=".title-bar" className="cursor-move">
    <Rnd
      default={{
        x: 400,
        y: 400,
        width: 400,
        height: 400,
      }}
      minWidth={400}
      minHeight={400}
      maxWidth={800}
      maxHeight={800}
      lockAspectRatio
      bounds="parent" // Limits dragging within the parent container
      dragHandleClassName="title-bar"
    >
      <div className="window">
        <div className="title-bar" >
          <div className="title-bar-text" aria-disabled>IMGtoFilm</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" disabled />
            <button aria-label="Maximize" disabled />
            <button aria-label="Close" disabled />
          </div>
        </div>

        <div className="window-body has-space">
          {/* Tab Navigation */}
          <menu role="tablist" aria-label="Window with Tabs">
            <button
              role="tab"
              aria-controls="convert"
              aria-selected={activeTab === "convert"}
              className={`tab-button ${activeTab === "convert" ? "active" : ""}`}
              onClick={() => handleTabClick("convert")}
            >
              Convert
            </button>
            <button
              role="tab"
              aria-controls="pics"
              aria-selected={activeTab === "pics"}
              className={`tab-button ${activeTab === "pics" ? "active" : ""}`}
              onClick={() => handleTabClick("pics")}
            >
              My Pictures
            </button>
            <button
              role="tab"
              aria-controls="settings"
              aria-selected={activeTab === "settings"}
              className={`tab-button ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => handleTabClick("settings")}
            >
              Settings
            </button>
          </menu>

          {/* Tab Panels */}
          {/* <article role="tabpanel" id="convert" hidden={activeTab !== "convert"}>
            <p className="mb-1">Upload a picture</p>
            <fieldset className="">
              <div className="flex flex-col align-baseline">
                <div className="flex flex-row justify-between">
                  <button
                    className=""
                    onClick={handleButtonClick}
                    >
                      Choose File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={imageChange}
                  />
                  <div>
                    <label className="mr-2">Quality</label>
                    <select>
                      <option>100%</option>
                      <option>75%</option>
                      <option>50%</option>
                    </select>
                  </div>
                </div>
                
                {selectedImage && (
                  <div className="mt-4">
                    <p>Filename: {selectedImage.name}</p>
                    <p>File Size: {(selectedImage.size / 1024).toFixed(2)} KB</p>
                  </div>
                )}
              </div>
              
            
            </fieldset>
            <section className="field-row flex justify-end">
              <button className="mr-2">Upload</button>
            </section>
          </article> */}

          {/* Use the separated MyPicturesTab component */}
          {activeTab === "convert" && <UploadTab />}
          {activeTab === "pics" && <PictureTab />}

          <article role="tabpanel" id="settings" hidden={activeTab !== "settings"}>
            <p>
              Edit Settings
            </p>
            
          </article>

          {/* Footer Buttons */}
          {/* <section className="field-row flex justify-end">
            <button className="default">OK</button>
            <button>Cancel</button>
          </section> */}
        </div>
      </div>
    {/* </Draggable> */}
    </Rnd>
  );
}
