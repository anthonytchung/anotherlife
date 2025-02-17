"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import IMGtoFilm from "@/components/IMGtoFilm";
import Taskbar from "@/components/Taskbar";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if loading is finished and there's no authenticated user
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return <span className="loader animate m-auto h-auto justify-center" aria-label="Processing your request"></span>
  }

  return (
    <div
      id="homepage"
      className="min-h-screen flex flex-col items-center justify-center bg-win7_bg bg-cover bg-center"
    >
      <IMGtoFilm />
    </div>
  );
}
