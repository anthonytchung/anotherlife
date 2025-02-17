// PictureTab.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function PictureTab() {
  const { user } = useAuth();
  const [pictures, setPictures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetches the pictures for the given user UID from Firestore
  async function fetchUserPictures(uid: string): Promise<string[]> {
    const picsQuery = query(
      collection(db, "pictures"),
      where("uid", "==", uid)
    );
    const querySnapshot = await getDocs(picsQuery);
    const pics = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return data.url;
    });
    return pics;
  }

  useEffect(() => {
    async function loadPictures() {
      setLoading(true);
      setError("");
      if (user) {
        if (user.isAnonymous) {
          // If the user is anonymous, they don't have any pictures.
          setPictures([]);
        } else {
          try {
            const pics = await fetchUserPictures(user.uid);
            setPictures(pics);
          } catch (err: any) {
            setError("Failed to load pictures. Please try again.");
            console.error(err);
          }
        }
      } else {
        setPictures([]);
      }
      setLoading(false);
    }
    loadPictures();
  }, [user]);

  return (
    <article role="tabpanel" id="pics">
      {loading && <p>Loading pictures...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && pictures.length === 0 && (
        <p>No pictures uploaded yet.</p>
      )}
      {!loading &&
        pictures.map((src, index) => (
          <Image
            key={index}
            className="w-full"
            src={src}
            width={500}
            height={500}
            alt={`Uploaded picture ${index + 1}`}
          />
        ))}
    </article>
  );
}
