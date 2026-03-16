import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import NeonCursor from "./components/NeonCursor";
import TotoroStickers from "./components/TotoroStickers";
import MusicPlayer from "./components/MusicPlayer";

import Home from "./pages/Home";

import Eunoia from "./pages/Eunoia";
import MeteorMate from "./pages/MeteorMates";
import ACMArchives from "./pages/ACMArchives";
import GDSC from "./pages/GDSC";
import Valorant from "./pages/Valorant";

import Prodigy from "./pages/Prodigy";
import Weather from "./pages/Weather";
import Voice from "./pages/Voice";
import Pomodoro from "./pages/Pomodoro";
import Galaga from "./pages/Galaga";
import Callback from "./pages/Callback";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        {/* Main pages */}
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />

        {/* Spotify callback */}

        {/* Design detail pages */}
        <Route path="/projects/eunoia" element={<PageWrapper><Eunoia /></PageWrapper>} />
        <Route path="/projects/meteormate" element={<PageWrapper><MeteorMate /></PageWrapper>} />
        <Route path="/projects/acmarchives" element={<PageWrapper><ACMArchives /></PageWrapper>} />
        <Route path="/projects/gdsc" element={<PageWrapper><GDSC /></PageWrapper>} />
        <Route path="/projects/valorant" element={<PageWrapper><Valorant /></PageWrapper>} />

        {/* Dev project detail pages */}
        <Route path="/projects/prodigy" element={<PageWrapper><Prodigy /></PageWrapper>} />
        <Route path="/projects/weather" element={<PageWrapper><Weather /></PageWrapper>} />
        <Route path="/projects/voice" element={<PageWrapper><Voice /></PageWrapper>} />
        <Route path="/projects/pomodoro" element={<PageWrapper><Pomodoro /></PageWrapper>} />
        <Route path="/projects/galaga" element={<PageWrapper><Galaga /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <NeonCursor />
      <TotoroStickers />
      <div className="background"></div>
      <Navbar />
      <div className="app-content">
        <AnimatedRoutes />
      </div>
      <MusicPlayer />
    </Router>
  );
}