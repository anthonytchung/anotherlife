// UploadTab.tsx
import React, { useState, useRef } from "react";
import { storage, db } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

export default function UploadTab() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [quality, setQuality] = useState("100%");
  const { user } = useAuth();

  // Triggered when a file is selected
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Programmatically click the hidden file input
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Upload the file to Firebase Storage and save metadata to Firestore
  const handleUpload = () => {
    setError("");
    if (!selectedImage) {
      setError("No file selected.");
      return;
    }

    // Build a file name and determine storage path based on user UID (or "anonymous")
    const fileName = `${Date.now()}_${selectedImage.name}`;
    const uid = user?.uid || "anonymous";
    const storageRef = ref(storage, `uploads/${uid}/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Update progress state
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (uploadError) => {
        setError(uploadError.message);
      },
      async () => {
        // On successful upload, get download URL and add document to Firestore
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, "pictures"), {
            uid: uid,
            url: downloadUrl,
            quality: quality, // Store the selected quality option
            createdAt: serverTimestamp(),
          });
          // Reset state after successful upload
          setSelectedImage(null);
          setUploadProgress(0);
        } catch (firestoreError: any) {
          setError(firestoreError.message);
        }
      }
    );
  };

  return (
    <article role="tabpanel" id="convert">
      <p className="mb-1">Upload a picture</p>
      <fieldset>
        <div className="flex flex-col align-baseline">
          <div className="flex flex-row justify-between">
            <button onClick={handleButtonClick}>Choose File</button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={imageChange}
            />
            <div>
              <label className="mr-2">Quality</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              >
                <option value="100%">100%</option>
                <option value="75%">75%</option>
                <option value="50%">50%</option>
              </select>
            </div>
          </div>

          {selectedImage && (
            <div className="mt-4">
              <p>Filename: {selectedImage.name}</p>
              <p>
                File Size: {(selectedImage.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
        </div>
      </fieldset>
      <section className="field-row flex justify-end">
        <button onClick={handleUpload} className="mr-2">
          Upload
        </button>
      </section>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>
      )}
      {error && <p className="text-red-600">{error}</p>}
    </article>
  );
}
