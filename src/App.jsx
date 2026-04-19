import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import TotoroStickers from "./components/TotoroStickers";

import Home from "./components/pages/Home";
import Eunoia from "./components/pages/Eunoia";
import MeteorMate from "./components/pages/MeteorMate";
import ACMArchives from "./components/pages/ACMArchives";
import GDSCWebsite from "./components/pages/GDSCWebsite";
import ValorantCards from "./components/pages/ValorantCards";

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
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />

        <Route
          path="/projects/eunoia"
          element={
            <PageWrapper>
              <Eunoia />
            </PageWrapper>
          }
        />

        <Route
          path="/projects/meteormate"
          element={
            <PageWrapper>
              <MeteorMate />
            </PageWrapper>
          }
        />

        <Route
          path="/projects/acmarchives"
          element={
            <PageWrapper>
              <ACMArchives />
            </PageWrapper>
          }
        />

        <Route
          path="/projects/gdsc"
          element={
            <PageWrapper>
              <GDSCWebsite />
            </PageWrapper>
          }
        />

        <Route
          path="/projects/valorant"
          element={
            <PageWrapper>
              <ValorantCards />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <TotoroStickers />
      <div className="background"></div>
      <Navbar />
      <div className="app-content">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}