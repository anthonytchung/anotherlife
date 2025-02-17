import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

type PictureContextType = {
  pictures: string[];
  refreshPictures: () => Promise<void>;
};

const PictureContext = createContext<PictureContextType>({
  pictures: [],
  refreshPictures: async () => {},
});

export const PictureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [pictures, setPictures] = useState<string[]>([]);

  async function fetchUserPictures(uid: string): Promise<string[]> {
    const picsQuery = query(
      collection(db, "pictures"),
      where("uid", "==", uid)
    );
    const querySnapshot = await getDocs(picsQuery);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return data.url;
    });
  }

  const refreshPictures = async () => {
    if (user && !user.isAnonymous) {
      try {
        const pics = await fetchUserPictures(user.uid);
        setPictures(pics);
      } catch (error) {
        console.error("Error fetching pictures: ", error);
      }
    } else {
      setPictures([]);
    }
  };

  // Refresh pictures when user changes (or on initial load)
  useEffect(() => {
    refreshPictures();
  }, [user]);

  return (
    <PictureContext.Provider value={{ pictures, refreshPictures }}>
      {children}
    </PictureContext.Provider>
  );
};

export const usePictures = () => useContext(PictureContext);
