// PictureTab.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

export default function PictureTab() {
  const { user } = useAuth();
  const [pictures, setPictures] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cacheKey = user && !user.isAnonymous ? `pictures_${user.uid}` : null;

  const fetchPictures = async (forceRefresh = false) => {
    // If we have a valid cache key and not forcing a refresh, try to load from sessionStorage
    if (cacheKey && !forceRefresh) {
      const cachedPics = sessionStorage.getItem(cacheKey);
      if (cachedPics) {
        setPictures(JSON.parse(cachedPics));
        return;
      }
    }

    if (user && !user.isAnonymous) {
      setLoading(true);
      setError("");
      try {
        const picsQuery = query(
          collection(db, "pictures"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(picsQuery);
        const pics = querySnapshot.docs.map((doc) => doc.data().url);
        setPictures(pics);
        // Cache the pictures in sessionStorage
        if (cacheKey) {
          sessionStorage.setItem(cacheKey, JSON.stringify(pics));
        }
      } catch (err: any) {
        setError("Failed to load pictures. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setPictures([]);
    }
  };

  // Load pictures once when the component mounts
  useEffect(() => {
    fetchPictures();
    // We run this effect when the user changes.
    // Note: We do not include forceRefresh in the dependency array.
  }, [user]);

  return (
    <article
      role="tabpanel"
      id="pics"
      className="max-h-[calc(50vh-100px)] overflow-y-auto p-4"
    >
      <button onClick={() => fetchPictures(true)} className="mb-2 justify-self-end">
        Refresh Pictures
      </button>
      {loading && <div role="progressbar" className="marquee"></div>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && pictures.length === 0 && (
        <p>No pictures uploaded yet.</p>
      )}
      {!loading && pictures.length > 0 && (
        <fieldset className="flex flex-col gap-4">
          {pictures.map((src, index) => (
            <Image
              key={index}
              className="w-full"
              src={src}
              width={500}
              height={500}
              alt={`Uploaded picture ${index + 1}`}
            />
          ))}
        </fieldset>
      )}
    </article>
  );
}
