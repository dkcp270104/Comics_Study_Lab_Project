import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/home/HeroSection.jsx";
import QuickLinksSection from "../components/home/QuickLinksSection.jsx";
import CtaSection from "../components/home/CtaSection.jsx";
import SiteFooter from "../components/home/SiteFooter.jsx";
import { quickLinks } from "../data/comics";
import { apiRequest, getApiUrl } from "../services/api";
import { useAuth } from "../context/useAuth.js";

export default function Home() {
  const { user } = useAuth();
  const isLoggedIn = Boolean(user);
  const isAdmin = user?.role === "admin";
  const [featured, setFeatured] = useState([]);
  const [error, setError] = useState("");
  const apiBase = useMemo(() => getApiUrl(), []);

  useEffect(() => {
    apiRequest("/api/comics")
      .then((data) => {
        setFeatured(data.slice(0, 4));
      })
      .catch(() => {
        setError("Could not load books right now.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <HeroSection
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        featured={featured}
        error={error}
        apiBase={apiBase}
      />

      <QuickLinksSection links={quickLinks} />

      <CtaSection />

      <SiteFooter />
    </div>
  );
}
